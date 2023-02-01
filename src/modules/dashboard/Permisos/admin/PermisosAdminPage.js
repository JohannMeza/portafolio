import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Controls from "../../../../components/Controls";
import Icon from "../../../../components/icon/Icon";
import ButtonsFilterComponent from "../../../../components/layout/form/ButtonsFilterComponent";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { ListConstants } from "../../../../util/ListConstants";

const dataInitial = { PERMISOS: "", ESTADO: true }

export default function PermisosAdminPage() {
  const [data, handleInputChange, resetData] = useForm(dataInitial);
  const [permisos, setPermisos] = useState([]);
  const {setLoader} = useLoaderContext();
  const navigate = useNavigate();

  const listPermisos = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 17,
      body: data,
      success: (resp) => {
        setLoader(false)
        setPermisos(resp.dataList)
      }, 
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  useEffect(() => {
    listPermisos()
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Permiso" value={data} name="PERMISOS" onChange={handleInputChange} />
              <Controls.SelectComponent list={ListConstants.LIST_ESTADOS} name="ESTADO" value={data} label="Estado" onChange={handleInputChange} />
            </div>
            <ButtonsFilterComponent handleClear={resetData} handleFilter={listPermisos} />
          </div>
        </Controls.CardComponent>
      </div>
      <div className='margin-base-top-card'>
        <Controls.CardComponent zIndex={1} title={"Permisos"}>
          <div className='flex gap-2'>
            <Controls.ButtonComponent title="Nuevo" className="color-secondary" onClick={() => navigate("/dashboard/permisos/nuevo")} />
          </div>
          <div>
            <Controls.TableComponent>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Perfil</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {permisos.map((el, index) => (
                  <tr key={index}>
                    <td>{el.id_permisos}</td>
                    <td>{el.permiso}</td>
                    <td>{el.estado ? "Activo" : "Inactivo"}</td>
                    <td>
                      <div className='flex gap-2 justify-center'>
                        <Controls.ButtonIconComponent title="Editar" icon={<Icon.Edit />} onClick={() => navigate(`/dashboard/permisos/${el.id_permisos}`)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Controls.TableComponent>
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  );
}
