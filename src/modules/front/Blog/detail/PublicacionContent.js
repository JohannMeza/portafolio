import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import card from "../../../../assets/imagenes/card.png";
import 'quill/dist/quill.snow.css';
import DateUtil from '../../../../util/DateUtil';
import Controls from '../../../../components/Controls';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import user from '../../../../assets/imagenes/user.png'
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { SendRequestData } from '../../../../helpers/helpRequestBackend';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../../../../util/PathConstants';

const dataInitial = { COMENTARIO: '' }
export default function PublicacionContent({ id, publicacion, quillRef, publicacionesRelacionadas }) {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};

    if ("COMENTARIO" in fieldValues) {
      temp.COMENTARIO = fieldValues.COMENTARIO === "" ? "El comentario no puede estar vacio" : "";
    } 

    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }
  const {data, setData, errors, setErrors, handleInputFormChange} = useFormValidation(dataInitial, true, validate)
  const { setLoader } = useLoaderContext();
  const [comments, setComments] = useState([])
  const alert = useAlert()
  
  const getComentarios = () => {
    setLoader(true)
    SendRequestData({
      queryId: 43,
      body: { ID_PUBLICACIONES: id }, 
      success: (resp) => {
        setLoader(false)
        setComments(resp.dataList)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const añadirComentario = () => {
    if (validate()) {
      setLoader(true)
      SendRequestData({
        queryId: 42,
        body: {
          ...data,
          ID_PUBLICACIONES: id,
          ID_COMENTARIOS_PADRE: 0,
          ID_COMENTARIOS_RESPONDER: 0
        }, 
        success: (resp) => {
          setLoader(false)
          getComentarios()
          alert.success(resp.message)
        }, 
        error: (err) => {
          setLoader(false)
          const { message, status } = err;
          (status < 500) && alert.error(message)
        }
      })
    }
  }

  const responderComentario = (idComentariosPadre, idComentariosResponder, name) => {
    if (data[name] === '') {
      setErrors((errors) => { return { ...errors, [name]: "El comentario no puede estar vacio" } })
      return;
    }
    setLoader(true)
    SendRequestData({
      queryId: 42,
      body: {
        COMENTARIO: data[name],
        ID_PUBLICACIONES: id,
        ID_COMENTARIOS_PADRE: idComentariosPadre,
        ID_COMENTARIOS_RESPONDER: idComentariosResponder
      }, 
      success: (resp) => {
        setLoader(false)
        getComentarios()
        setData((data) => { return { ...data, [name]: '' } })
        alert.success(resp.message)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const cancelarRespuesta = (idComentarioPadre, idComentarioRespuesta = 0, name) => {
    const commentFilter = comments.map(el => {
      if (el.ID_COMENTARIOS === idComentarioPadre) return {
        ...el,
        FLG_RESPONDER: idComentarioRespuesta === 0 ? false : el.FLG_RESPONDER,
        RESPUESTAS: idComentarioRespuesta !== 0
          ? el.RESPUESTAS.map(res => res.ID_COMENTARIOS === idComentarioRespuesta
            ? { ...res, FLG_RESPONDER: false }
            : res)
          : el.RESPUESTAS
      }
      return el
    });

    if (name) {
      const objErrores = { ...errors };
      delete objErrores[name]
      setErrors(objErrores)
    }

    setComments(commentFilter)
  }

  const handleClickResponder = (idComentarioPadre, idComentarioRespuesta = 0) => {
    const commentFilter = comments.map(el => {
      if (el.ID_COMENTARIOS === idComentarioPadre) return {
        ...el,
        FLG_RESPONDER: idComentarioRespuesta === 0,
        RESPUESTAS: idComentarioRespuesta !== 0
          ? el.RESPUESTAS.map(res => res.ID_COMENTARIOS === idComentarioRespuesta
            ? { ...res, FLG_RESPONDER: true }
            : res )
          : el.RESPUESTAS
      }
      return el
    });
    setComments(commentFilter)
  }

  useEffect(() => getComentarios, [])
  
  return (
    <div className='box-base'>
      <h1 className='title-h3-base mb-3'>{publicacion.TITULO}</h1>
      <Publicacion>
        <div>
          <img src={publicacion.PORTADA} alt="" className='w-full h-[350px] object-cover rounded-[10px]' />
          <div className='flex justify-between my-4'>
            <div className='flex gap-4 items-center'>
              <img src={card} alt="" className='w-16 h-16 rounded-full' />
              <div className='flex flex-col justify-center'>
                <span className=''>Publicado por:</span>         
                <span className='text-paragraph-1 font-bold'>{ publicacion.AUTOR }</span>
                <span className='text-paragraph-3 font-bold'>{ publicacion.PERFIL }</span>
                <div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className='flex flex-col text-right font-semibold text-paragraph-3'>
              <span>{ DateUtil().FormatDate(publicacion.FECHA_PUBLICACION) }</span>
              <span>{publicacion.UBICACION}</span>
            </div>
          </div>
          <article className="publicacion-base-content" ref={quillRef}></article>
          <section className='mt-3'>
            <h2 className='text-paragraph-1 font-bold mb-3'>Añadir un nuevo comentario</h2>

            <Controls.InputComponent
              value={data}
              name='COMENTARIO'
              onChange={handleInputFormChange}
              error={errors}
              textarea
            />

            <div className='mt-3'>
              <Controls.ButtonComponent title="RESPONDER" onClick={añadirComentario} />
            </div>
          </section>

          <section className='mt-3'>
            <h2 className='text-paragraph-1 font-bold mb-3'>Comentarios</h2>
            {
              comments.map((el, index) => (
                <ComentarioPublicacion key={index}>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-2'> 
                      <img src={user} className='w-10 h-10' alt="" />
                      <div>
                        <span className='block text-paragraph-2'>{ el.USUARIO }</span>
                        <span className='block text-paragraph-3'>{ el.PERFIL }</span>
                      </div>
                    </div>
    
                    <div className='button-response opacity-0 animation-opacity duration-500'>
                      <Controls.ButtonComponent
                        title='Responder'
                        onClick={() => handleClickResponder(el.ID_COMENTARIOS)}
                      />
                    </div>
                  </div>
                  <p className='text-text text-paragraph-2 mt-2'>{ el.COMENTARIO }</p>
                  {
                    el.FLG_RESPONDER && (
                      <div className='mt-3'>
                        <h2 className='text-paragraph-1 font-bold mb-3'>Responder</h2>

                        <Controls.InputComponent
                          value={data}
                          name={`COMENTARIO_${el.ID_COMENTARIOS}`}
                          onChange={handleInputFormChange}
                          error={errors}
                          textarea
                        />

                        <div className='mt-3 flex gap-2'>
                          <Controls.ButtonComponent title="RESPONDER" onClick={() => responderComentario(el.ID_COMENTARIOS, el.ID_COMENTARIOS, `COMENTARIO_${el.ID_COMENTARIOS}`)} />
                          <Controls.ButtonComponent title="CANCELAR" className='color-secondary' onClick={() => cancelarRespuesta(el.ID_COMENTARIOS)} />
                        </div>
                      </div>
                    )
                  }

                  <section className='border-l-blue-500 border-l-2'>
                    {
                      el.RESPUESTAS.map((res, index) => (
                        <ComentarioPublicacion key={index} className='mt-3 ml-3'>
                          <div className='flex justify-between'>
                            <div className='flex items-center gap-2'> 
                              <img src={user} className='w-10 h-10' alt="" />
                              <div>
                                <span className='block text-paragraph-2'>{ res.USUARIO }</span>
                                <span className='block text-paragraph-3'>{ res.PERFIL }</span>
                              </div>
                            </div>
        
                            <div className='button-response opacity-0 animation-opacity duration-500'>
                              <Controls.ButtonComponent
                                title='Responder'
                                onClick={() => handleClickResponder(el.ID_COMENTARIOS, res.ID_COMENTARIOS)}
                              />
                            </div>
                          </div>
                          <p className='text-text text-paragraph-2 mt-2'>{res.COMENTARIO}</p>
                          {
                            res.FLG_RESPONDER && (
                              <div className='mt-3'>
                                <h2 className='text-paragraph-1 font-bold mb-3'>Responder</h2>

                                <Controls.InputComponent
                                  value={data}
                                  name={`COMENTARIO_${el.ID_COMENTARIOS}`}
                                  onChange={handleInputFormChange}
                                  error={errors}
                                  textarea
                                />

                                <div className='mt-3 flex gap-2'>
                                  <Controls.ButtonComponent title="RESPONDER" onClick={() => responderComentario(el.ID_COMENTARIOS, res.ID_COMENTARIOS, `COMENTARIO_${el.ID_COMENTARIOS}`)} />
                                  <Controls.ButtonComponent title="CANCELAR" className='color-secondary' onClick={() => cancelarRespuesta(el.ID_COMENTARIOS, res.ID_COMENTARIOS, `COMENTARIO_${el.ID_COMENTARIOS}`)} />
                                </div>
                              </div>
                            )
                          }
                        </ComentarioPublicacion>
                      ))
                    }
                  </section>
                </ComentarioPublicacion>
              ))
            }
           
          </section>
        </div>
        <div>
          <h2 className='title-base mb-3 text-paragraph-1'>Publicaciones Relacionadas</h2>
          <div className='flex flex-col gap-6'>
            {
              publicacionesRelacionadas.map((el, index) => (
                <PublicacionRelacionada key={index} data={el} />
              ))
            }
          </div>
        </div>
      </Publicacion>
    </div>
  )
}

const Publicacion = styled.div`
  display: grid;
  grid-template-columns: 1fr 35%;
  gap: 20px;
`;

const ComentarioPublicacion = styled.article`
  margin-top: 15px;
  &:hover > div > .button-response {
    opacity: 1;
  }
`;

const PublicacionRelacionada = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex gap-3'>
        <img src={data.portada} alt="" className='w-32 h-16 rounded-sm' />
        <div>
          <h3 className='title-base text-paragraph-2 hover:text-secondary cursor-pointer' onClick={() => navigate(`${PathConstants.blog_publicacion}${data.id_publicaciones}`)}>{ data.titulo }</h3>
          <p className='text-paragraph-3'>{ data.descripcion_corta }</p>
          <div className='flex items-center gap-3 mt-2'>
            <img src={card} alt="" className='w-6 h-6 rounded-full' />
            <span className='font-Poppins text-paragraph-3 font-bold'>{ data.AUTOR }</span>
          </div>
        </div>
      </div>  
    </div>
  )
}