import React, {useState, useEffect} from 'react';
import { useQuill } from 'react-quilljs';
import { useNavigate, useParams } from 'react-router';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { FileRequestData, SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useAlert } from 'react-alert';
import PathConstants from '../../../../util/PathConstants';
import Toolbar from '../../../../config/Toolbar';
import Controls from '../../../../components/Controls';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import useFileUpload from '../../../../hooks/useFileUpload';
import 'quill/dist/quill.snow.css';
import { useListEstados } from '../../../../hooks/useListEstados';

const dataInitial = { TITULO: "", ID_CATEGORIAS: "", ID_ETIQUETAS: "", PUBLICACION: "", ID_ESTADO: null, PORTADA: "", DESCRIPCION_CORTA: "" }

export default function PublicacionesDetailPage() {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    if ("TITULO" in fieldValues) {
      temp.TITULO = fieldValues.TITULO === "" ? "El campo Titulo es requerido" : "";
    } 

    if ("ID_CATEGORIAS" in fieldValues) {
      temp.ID_CATEGORIAS = fieldValues.ID_CATEGORIAS === "" ? "El campo Categorias es requerido" : "";
    } 

    if ("ID_ETIQUETAS" in fieldValues) {
      temp.ID_ETIQUETAS = fieldValues.ID_ETIQUETAS === "" ? "El campo Etiquetas es requerido" : "";
    } 

    if ("TIPO" in fieldValues) {
      temp.TIPO = fieldValues.TIPO === null ? "El campo Tipo Menú es requerido" : "";
    } 

    if ("RUTA" in fieldValues) {
      temp.RUTA = !fieldValues.RUTA && data.TIPO ? "El campo Ruta es requerido" : "";
    } 

    if ("PORTADA" in fieldValues) {
      temp.PORTADA = (files.length === 0 || files.length === "") && !fieldValues.PORTADA ? "El campo Portada es requerido" : "";
    } 

    if ("DESCRIPCION_CORTA" in fieldValues) {
      temp.DESCRIPCION_CORTA = (fieldValues.DESCRIPCION_CORTA?.length || 0) > 250
        ? "El campo Descripcion corta no debe exceder a 250 caracteres"
        : !fieldValues.DESCRIPCION_CORTA ? "El campo Descripcion corta es requerido" : "";;
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const {data, handleInputFormChange, errors, setErrors, setData} = useFormValidation(dataInitial, true, validate)
  const {quill, quillRef} = useQuill({modules: {toolbar: Toolbar}});
  const {setLoader} = useLoaderContext();
  const navigate = useNavigate();
  const {id} = useParams();
  const alert = useAlert();
  const estados = useListEstados('1,2,3')

  const [categorias, setCategorias] = useState([])
  const [etiquetas, setEtiquetas] = useState([])
  const [files, setFiles] = useFileUpload(true, (files) => {
    if (files.length === 0 && errors === true) setErrors(errors => { return { ...errors, PORTADA: `El campo Portada es requerido` } })
    else setErrors((errors) => delete errors.PORTADA)
  })

  const savePublicacion = () => {
    
    if (validate()) {
      let arrCategorias = [...data.ID_CATEGORIAS.split(',').map(el => { return { id_categorias: el } })]
      let arrEtiquetas = [...data.ID_ETIQUETAS.split(',').map(el => { return { id_etiquetas: el } })]
      if (arrCategorias[0].id_categorias === '') arrCategorias.splice(0, 1);
      if (arrEtiquetas[0].id_etiquetas === '') arrEtiquetas.splice(0, 1);
      setLoader(true);
      
      if (data.PORTADA || files.length === 0) {
        SaveRequestData({
          queryId: 29,
          body: {
            ...data,
            id_publicaciones: id || 0,
            ID_CATEGORIAS: JSON.stringify(arrCategorias),
            ID_ETIQUETAS: JSON.stringify(arrEtiquetas),
            PUBLICACION: JSON.stringify(quill.getContents()),
          },
          success: (resp) => {
            setLoader(false)
            alert.success(resp.message)
            !id && navigate(PathConstants.publicaciones_admin)
          },
          error: (err) => {
            setLoader(false)
            const { message, status } = err;
            (status < 500) && alert.error(message)
          }
        })
      } else {
        FileRequestData({
          queryId: 29,
          body: {
            ...data,
            id_publicaciones: id || 0,
            ID_CATEGORIAS: JSON.stringify(arrCategorias),
            ID_ETIQUETAS: JSON.stringify(arrEtiquetas),
            PUBLICACION: JSON.stringify(quill.getContents()),
            PORTADA: files[0].file
          },
          success: (resp) => {
            setLoader(false)
            alert.success(resp.message)
            !id && navigate(PathConstants.publicaciones_admin)
          },
          error: (err) => {
            setLoader(false)
            const { message, status } = err;
            (status < 500) && alert.error(message)
          }
        })
      }
    }
  }

  const listCategorias = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 27,
      body: data,
      success: (resp) => {
        setLoader(false)
        setCategorias(resp.dataList)
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const listEtiquetas = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 28,
      body: data,
      success: (resp) => {
        setLoader(false)
        setEtiquetas(resp.dataList)
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const searchPublicacion = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 32,
      body: { id_publicaciones: id },
      success: (resp) => {
        let strCategorias = Array.from(resp.dataObject.ID_CATEGORIAS, el => el.value).join(',')
        let strEtiquetas = Array.from(resp.dataObject.ID_ETIQUETAS, el => el.value).join(',')
        setLoader(false)
        setData({ ...resp.dataObject, ID_CATEGORIAS: strCategorias, ID_ETIQUETAS: strEtiquetas })
        quill.setContents(JSON.parse(resp.dataObject.PUBLICACION))
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    listCategorias();
    listEtiquetas();

    if (id && quill) searchPublicacion()
  }, [quill])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={15} title={"Datos Generales"}>
          <div className="flex gap-2"></div>
          <div className="grid grid-cols-3 gap-4">
            <Controls.InputComponent
              label="Titulo"
              value={data}
              name="TITULO"
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.SearchComponent
              value={data}
              label="Categorias"
              name="ID_CATEGORIAS"
              list={categorias}
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.SearchComponent
              value={data}
              label="Etiquetas"
              name="ID_ETIQUETAS"
              list={etiquetas}
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.SelectComponent
              label="Estados"
              list={estados}
              value={data}
              name="ID_ESTADO"
              onChange={handleInputFormChange}
              error={errors}
            />
            <Controls.InputComponent
              label={`Descripcion Corta (${data.DESCRIPCION_CORTA?.length || 0} de 250)`}
              value={data}
              name="DESCRIPCION_CORTA"
              onChange={handleInputFormChange}
              error={errors}
              textarea
            />
            <Controls.FileComponent
              setFiles={setFiles}
              label='Portada'
              files={files}
              name="PORTADA"
              error={errors}
              value={data}
              setData={setData}
            />
          </div>
        </Controls.CardComponent>
      </div>

      <div className="margin-base-top-card">
        <Controls.CardComponent zIndex={11} title="Contenido">
          <div className="flex gap-2"></div>
          <div>
            <div ref={quillRef}></div>
          </div>
        </Controls.CardComponent>
      </div>

      <ButtonsSaveComponent handleBack={() => navigate(PathConstants.publicaciones_admin)} handleAction={savePublicacion} />
    </div>
  )
}