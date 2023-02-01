import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { CirclesWithBar } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import Icon from '../../../../components/icon/Icon';
import ButtonsFilterComponent from '../../../../components/layout/form/ButtonsFilterComponent';
import ModalComponent from '../../../../components/modal/ModalComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { ListConstants } from '../../../../util/ListConstants';

const dataInitial = { PERFIL: "", ESTADO: true }

export default function PerfilesAdminPage () {
  const navigate = useNavigate();  
  const [data, handleInputFormChange, resetData] = useForm(dataInitial);
  const [openModal, setOpenModal] = useState(false);
  const [perfil, setPerfil] = useState([]);
  const { setLoader } = useLoaderContext();
  const alert = useAlert();

  const getPerfiles = () => {
    setLoader(true)

    SaveRequestData({
      queryId: 2,
      body: data, 
      success: (resp) => {
        setLoader(false)
        setPerfil(resp.dataList || [])
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    getPerfiles()
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Nombre" value={data} name="PERFIL" onChange={handleInputFormChange} />
              <Controls.SelectComponent list={ListConstants.LIST_ESTADOS} name="ESTADO" value={data} label="Estado" onChange={handleInputFormChange} />
            </div>
            <ButtonsFilterComponent handleClear={resetData} handleFilter={getPerfiles} />
          </div>
        </Controls.CardComponent>
      </div>
      <div className='margin-base-top-card'>
        <Controls.CardComponent zIndex={1} title={"Perfiles"}>
          <div className='flex gap-2'>
            <Controls.ButtonComponent title="Nuevo" className="color-secondary" onClick={() => navigate("/dashboard/perfiles/nuevo")} />
          </div>
          <div>
            <Controls.TableComponent>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Perfil</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {perfil.map((el, index) => (
                  <tr key={index}>
                    <td>{el.id_perfiles}</td>
                    <td>{el.perfil}</td>
                    <td>{el.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      <div className='flex gap-2 justify-center'>
                        <Controls.ButtonIconComponent title="Editar" icon={<Icon.Edit />} onClick={() => navigate(`/dashboard/perfiles/${el.id_perfiles}`)} />
                        <Controls.ButtonIconComponent title="Administrar Menus" icon={<Icon.Edit />} onClick={() => navigate(`/dashboard/perfiles/permisos/${el.id_perfiles}`)} />
                        <Controls.ButtonIconComponent title="Administrar Permisos" icon={<Icon.Edit />} onClick={() => setOpenModal(true)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Controls.TableComponent>
          </div>
        </Controls.CardComponent>

        <Controls.ModalComponent title="Hola  123" openModal={openModal} setOpenModal={setOpenModal}>
          <Controls.ButtonComponent title={"Button"} />
        </Controls.ModalComponent>
      </div>
    </div>
  )
}