import React from 'react';
import { useQuill } from 'react-quilljs';
import { useNavigate } from 'react-router';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import Toolbar from '../../../../config/Toolbar';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import PathConstants from '../../../../util/PathConstants';
import 'quill/dist/quill.snow.css';
import { ListConstants } from '../../../../util/ListConstants';
import { useState } from 'react';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { useEffect } from 'react';

const dataInitial = { TITULO: "", ID_CATEGORIAS: "", ID_ETIQUETAS: "", CONTENIDO: "", ESTADO: null }

export default function PublicacionesDetailPage() {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("MENU" in fieldValues) {
      temp.MENU = fieldValues.MENU === "" ? "El campo Menú es requerido" : "";
    } 

    if ("ORDEN" in fieldValues) {
      temp.ORDEN = fieldValues.ORDEN === "" ? "El campo Orden es requerido" : "";
    } 

    if ("ESTADO" in fieldValues) {
      temp.ESTADO = fieldValues.ESTADO === null ? "El campo Estado es requerido" : "";
    } 

    if ("TIPO" in fieldValues) {
      temp.TIPO = fieldValues.TIPO === null ? "El campo Tipo Menú es requerido" : "";
    } 

    if ("RUTA" in fieldValues) {
      temp.RUTA = !fieldValues.RUTA && data.TIPO ? "El campo Ruta es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const [categorias, setCategorias] = useState([])
  const [etiquetas, setEtiquetas] = useState([])
  const {quill, quillRef} = useQuill({modules: {toolbar: Toolbar}});
  const navigate = useNavigate();
  const {data, handleInputFormChange, errors, setErrors} = useFormValidation(dataInitial, true, validate)
  const {setLoader} = useLoaderContext()

  const savePublicacion = () => {

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

  useEffect(() => {
    listCategorias();
    listEtiquetas()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={15} title={"Datos Generales"}>
          <div className="flex gap-2"></div>
          <div className="grid grid-cols-3 gap-4">
            <Controls.InputComponent
              label="Titulo"
              value={data}
              name="PERFIL"
              onChange={handleInputFormChange}
            />
            <Controls.SearchComponent
              value={data}
              label="Categorias"
              name="ID_CATEGORIAS"
              list={categorias}
              onChange={handleInputFormChange}
            />
            <Controls.SearchComponent
              value={data}
              label="Etiquetas"
              name="ID_ETIQUETAS"
              list={etiquetas}
              onChange={handleInputFormChange}
            />
            <Controls.SelectComponent
              label="Estados"
              list={ListConstants.LIST_ESTADOS_PUBLICACION}
              value={data}
              name="ESTADO"
              onChange={handleInputFormChange}
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