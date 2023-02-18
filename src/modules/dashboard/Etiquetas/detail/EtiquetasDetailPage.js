import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import Icon from '../../../../components/icon/Icon';
import ButtonsFilterComponent from '../../../../components/layout/form/ButtonsFilterComponent';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { classNames } from '../../../../util/ClassNames';
import { ListConstants } from '../../../../util/ListConstants';
import PathConstants from '../../../../util/PathConstants';

const dataInitial = { ETIQUETAS: "", ESTADO: true }
export default function EtiquetasDetailPage() {
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

  const navigate = useNavigate();
  const {setLoader} = useLoaderContext();
  const {data, handleInputFormChange, errors, setErrors, setData} = useFormValidation(dataInitial, true, validate)
  const {id} = useParams();
  const alert = useAlert();

  const saveEtiqueta = () => {
    setLoader(true) 
    SaveRequestData({
      queryId: 24,
      body: { ...data, id_etiquetas: id}, 
      success: (resp) => {
        setLoader(false)
        navigate(PathConstants.etiquetas_admin)
        alert.success(resp.message)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const searchEtiquetas = () => {
    setLoader(true) 
    SaveRequestData({
      queryId: 26,
      body: { id_etiquetas: id }, 
      success: (resp) => {
        setLoader(false)
        setData(resp.dataObject)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    if (id) searchEtiquetas();
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Etiqueta" name="ETIQUETAS" value={data} onChange={handleInputFormChange} />
              <Controls.SelectComponent label="Estado" name="ESTADO" list={ListConstants.LIST_ESTADOS} value={data} onChange={handleInputFormChange} />
            </div>
          </div>
        </Controls.CardComponent>
      </div>

      <ButtonsSaveComponent handleBack={() => navigate(PathConstants.etiquetas_admin)} handleAction={saveEtiqueta} />
    </div>
  )
}