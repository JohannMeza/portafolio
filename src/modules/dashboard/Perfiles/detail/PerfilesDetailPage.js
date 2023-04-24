import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useAlert } from "react-alert";
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { useListEstados } from '../../../../hooks/useListEstados';

const dataInitial = { PERFIL: "", ID_ESTADO: 4 }

export default function PerfilesDetailPage () {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("PERFIL" in fieldValues) {
      temp.PERFIL = fieldValues.PERFIL === "" ? "El campo Perfil es requerido" : "";
    } 

    if ("ID_ESTADO" in fieldValues) {
      temp.ID_ESTADO = fieldValues.ID_ESTADO === null ? "El campo Estado es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }
  
  const { id } = useParams()
  const navigate = useNavigate();
  const {data, setData, errors, setErrors, handleInputFormChange} = useFormValidation(dataInitial, true, validate);
  const alert = useAlert();
  const estados = useListEstados('4,5');
  const handleBack = () => navigate("/dashboard/perfiles/admin")
  const { setLoader } = useLoaderContext()

  const handleAction = () => {
    if (validate()) {
      setLoader(true)
      SaveRequestData({
        queryId: 1,
        body: {...data, ID_PERFIL: id}, 
        success: (resp) => {
          setLoader(false)
          alert.success(resp.message)
          navigate("/dashboard/perfiles/admin")
        }, 
        error: (err) => {
         setLoader(false)
         const { message } = err;
         alert.error(message)
       }
     })
    }
  }

  const getPerfil = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 3,
      body: { ID_PERFIL: id }, 
      success: (resp) => {
        setLoader(false)
        setData(resp.dataObject || {})
      }, 
      error: (err) => {
        setLoader(false)
        const { message } = err;
        alert.error(message)
      }
    })
  }

  useEffect(() => {
    if (id) getPerfil()
  }, [])
  
  return (
    <div>
      <div className='columns-1'>
        <Controls.CardComponent zIndex={10} title={"Nuevo"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Nombre" name="PERFIL" onChange={handleInputFormChange} value={data} error={errors} />
              <Controls.SelectComponent list={estados} name="ID_ESTADO" value={data} error={errors} label="Estado" onChange={handleInputFormChange} />
            </div>
            <ButtonsSaveComponent handleBack={handleBack} handleAction={handleAction} />
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  )
}