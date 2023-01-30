import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { json, Navigate, useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';

export default function PerfilesPermisosPage () {
  const [listMenus, setListMenus] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const {setLoader} = useLoaderContext();
  const [data, handleInputChange, ,setData] = useForm()
  const alert = useAlert();

  const getMenus = () => {
    SaveRequestData({
      queryId: 12,
      body: { ID_PERFIL: id }, 
      success: (resp) => {
        setLoader(false)
        setListMenus(resp.dataList || [])
        getMenusSave()
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const getMenusSave = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 13,
      body: { ID_PERFIL: id }, 
      success: (resp) => {
        setLoader(false)
        const arrObject = Object.values({...resp.dataList.map(el => el.id_menu)});
        let dataObject = {}
        arrObject.forEach((el) => dataObject = { ...dataObject, [`menu-name-${el}`]: el } )
        setData(dataObject)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const handleButtonSave = () => {
    const arrMenuActive = Array.from(Object.entries(data).filter(el => el[1]), el => { return {id_menu: parseInt(el[0].split("-")[2]), value: el[1]} });

    setLoader(true)
    SaveRequestData({
      queryId: 14,
      body: { ID_PERFIL: id, MENUS: arrMenuActive }, 
      success: (resp) => {
        setLoader(false)
        alert.success(resp.message)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }
  
  useEffect(() => {
    getMenus();
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <div className='columns-1'>
        <Controls.CardComponent zIndex={10} title={"Administrar Permisos"} isInactiveTitle>
          <div className='flex gap-2'></div>
          <div className=''>
            {
              listMenus.map((menu_1, index) => (
                <ListMenusComponents menu={menu_1} key={index} handleChange={handleInputChange} data={data} name={menu_1.id_menu} namePadre={null} label={menu_1.menu}>
                  {
                    menu_1?.sub_menus.length > 0 && 
                    menu_1?.sub_menus?.map((menu_2, index) => (
                      <ListMenusComponents menu={menu_2} key={index} handleChange={handleInputChange} data={data} name={menu_2.id_menu} namePadre={menu_1.id_menu} label={menu_2.menu}>
                      </ListMenusComponents>
                    ))
                  }
                </ListMenusComponents>
              ))
            }
          </div>
        </Controls.CardComponent>
        <ButtonsSaveComponent handleAction={handleButtonSave} handleBack={() => navigate("/dashboard/perfiles/admin")} />
      </div>
    </div>
  )
}


const ListMenusComponents = ({ children, handleChange, data, name, label, namePadre }) => {
  return (
    <Controls.AccordionComponents target={`target-menu-${name}`} checked={data[`menu-name-${name}`]}>
      <Controls.CheckboxComponent label={label} id={`id-menu-${name}`} value={data[`menu-name-${namePadre}`] === false ? false : data} onChange={handleChange} className="select-none cursor-pointer" name={`menu-name-${name}`} />
      <React.Fragment>{children}</React.Fragment>
    </Controls.AccordionComponents>
  )
}