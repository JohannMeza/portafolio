import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { useListEstados } from '../../../../hooks/useListEstados';
import useLoaderContext from '../../../../hooks/useLoaderContext';

const dataInitial = { MENU_PADRE: null, MENU: "", ORDEN: "", ICON: "", ID_ESTADO: 4, ID_ESTADO_MENU: 6, RUTA: "", COMPONENTE: null }
const listMenuPadre = { value: null, label: "Seleccione" };

export default function MenuDetailPage () {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    
    if ("MENU" in fieldValues) {
      temp.MENU = fieldValues.MENU === "" ? "El campo Menú es requerido" : "";
    } 

    if ("ORDEN" in fieldValues) {
      temp.ORDEN = fieldValues.ORDEN === "" ? "El campo Orden es requerido" : "";
    } 

    if ("ID_ESTADO" in fieldValues) {
      temp.ESTADO = fieldValues.ESTADO === null ? "El campo Estado es requerido" : "";
    } 

    if ("COMPONENTE" in fieldValues) {
      temp.COMPONENTE = !fieldValues.RUTA && data.TIPO ? "El campo Componente es requerido" : "";
    } 

    if ("ID_ESTADO_MENU" in fieldValues) {
      temp.ID_ESTADO_MENU = fieldValues.ID_ESTADO_MENU === null ? "El campo Estado Menú es requerido" : "";
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
  const {data, setData, errors, setErrors, handleInputFormChange} = useFormValidation(dataInitial, true, validate)
  const [menuPadre, setMenuPadre] = useState([]);
  const estados = useListEstados("4,5");
  const estados_menu = useListEstados("7,6");
  const {setLoader} = useLoaderContext();
  const {id} = useParams();
  const alert = useAlert();
  
  const handleSave = () => {
    if (validate()) {
      setLoader(true) 
      SaveRequestData({
        queryId: 4,
        body: data, 
        success: (resp) => {
          setLoader(false)
          navigate("/dashboard/menu/admin")
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

  const searchMenu = () => {
    setLoader(true) 
    SaveRequestData({
      queryId: 7,
      body: { ID_MENU: id }, 
      success: (resp) => {
        setData(resp.dataObject)
        setLoader(false)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const listarMenusPadres = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 5,
      body: { ID_MENU: id }, 
      success: (resp) => {
        setLoader(false)
        setMenuPadre([listMenuPadre, ...resp.dataList] || [])
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    if (data.ID_ESTADO_MENU === 6) setData((data) => { return { ...data, RUTA: "", COMPONENTE: "" } })  
  }, [data.ID_ESTADO_MENU])

  useEffect(() => {
    listarMenusPadres()
    if (id) searchMenu()
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Nuevo"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Menú" name="MENU" value={data} onChange={handleInputFormChange} error={errors} />
              <Controls.SelectComponent label="Menu Padre" name="MENU_PADRE" list={menuPadre} type="number" value={data} onChange={handleInputFormChange} className="relative z-20" />
              <Controls.SelectComponent label="Tipo" name="ID_ESTADO_MENU" list={estados_menu} value={data} onChange={handleInputFormChange} error={errors} />
              <Controls.InputComponent label="Ruta" name="RUTA" value={data} disabled={data?.ID_ESTADO_MENU === 6 && true} onChange={handleInputFormChange} error={errors} />
              <Controls.InputComponent label="Componente" name="COMPONENTE" value={data} disabled={data?.ID_ESTADO_MENU === 6 && true} onChange={handleInputFormChange} error={errors} />
              <Controls.InputComponent label="Orden" type='number' name="ORDEN" value={data} onChange={handleInputFormChange} error={errors} />
              <Controls.InputComponent label="Icon" name="ICON" value={data} onChange={handleInputFormChange} />
              <Controls.SelectComponent label="Estado" name="ID_ESTADO" value={data} list={estados} onChange={handleInputFormChange} error={errors} className="relative z-10" />
            </div>
          </div>
        </Controls.CardComponent>
      </div>

      <div>
        <ButtonsSaveComponent handleBack={() => navigate("/dashboard/menu/admin")} handleAction={handleSave} />
      </div>
    </div>
  )
}