import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { CirclesWithBar } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Controls from "../../../../components/Controls";
import Icon from "../../../../components/icon/Icon";
import ButtonsFilterComponent from "../../../../components/layout/form/ButtonsFilterComponent";
import ButtonsSaveComponent from "../../../../components/layout/form/ButtonsSaveComponent";
import ModalComponent from "../../../../components/modal/ModalComponent";
import { SaveRequestData } from "../../../../helpers/helpRequestBackend";
import { useForm } from "../../../../hooks/useForm";
import useLoaderContext from "../../../../hooks/useLoaderContext";
import { ListConstants } from "../../../../util/ListConstants";

const dataInitial = { PERFIL: "", ESTADO: true };

export default function PerfilesAdminPage() {
  const navigate = useNavigate();
  const [data, handleInputFormChange, resetData] = useForm(dataInitial);
  const [perfil, setPerfil] = useState([]);
  const { setLoader } = useLoaderContext();
  const [openModal, setOpenModal] = useState(false);
  const [idPerfiles, setIdPerfiles] = useState(null)
  const alert = useAlert();

  const getPerfiles = () => {
    setLoader(true);
    SaveRequestData({
      queryId: 2,
      body: data,
      success: (resp) => {
        setLoader(false);
        setPerfil(resp.dataList || []);
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  };

  useEffect(() => {
    getPerfiles();
  }, []);

  return (
    <div>
      <div>
        <Controls.CardComponent zIndex={10} title={"Filtrado"}>
          <div className="flex gap-2"></div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              <Controls.InputComponent
                label="Nombre"
                value={data}
                name="PERFIL"
                onChange={handleInputFormChange}
              />
              <Controls.SelectComponent
                list={ListConstants.LIST_ESTADOS}
                name="ESTADO"
                value={data}
                label="Estado"
                onChange={handleInputFormChange}
              />
            </div>
            <ButtonsFilterComponent
              handleClear={resetData}
              handleFilter={getPerfiles}
            />
          </div>
        </Controls.CardComponent>
      </div>
      <div className="margin-base-top-card">
        <Controls.CardComponent zIndex={1} title={"Perfiles"}>
          <div className="flex gap-2">
            <Controls.ButtonComponent
              title="Nuevo"
              className="color-secondary"
              onClick={() => navigate("/dashboard/perfiles/nuevo")}
            />
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
                      <div className="flex gap-2 justify-center">
                        <Controls.ButtonIconComponent
                          title="Editar"
                          icon={<Icon.Edit />}
                          onClick={() =>
                            navigate(`/dashboard/perfiles/${el.id_perfiles}`)
                          }
                        />
                        <Controls.ButtonIconComponent
                          title="Administrar Menus"
                          icon={<Icon.Edit />}
                          onClick={() =>
                            navigate(
                              `/dashboard/perfiles/permisos/${el.id_perfiles}`
                            )
                          }
                        />
                        <Controls.ButtonIconComponent
                          title="Administrar Permisos"
                          icon={<Icon.Edit />}
                          onClick={() => { setOpenModal(true); setIdPerfiles(el.id_perfiles) }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Controls.TableComponent>
          </div>
        </Controls.CardComponent>

        {idPerfiles && <ModalPermisosComponent openModal={openModal} setOpenModal={setOpenModal} idPerfiles={idPerfiles} setIdPerfiles={setIdPerfiles} />}
      </div>
    </div>
  );
}

const ModalPermisosComponent = ({ openModal, setOpenModal, idPerfiles, setIdPerfiles }) => {
  const [permisos, setPermisos] = useState([]);
  const {setLoader} = useLoaderContext();
  const [dataPermisos, handleInputFormChange, ,setDataPermisos] = useForm({});
  const alert = useAlert();
  
  const closeModal = () => {
    setIdPerfiles(null)
    setOpenModal(false)
  }

  const getPermisos = () => {
    setLoader(true);
    SaveRequestData({
      queryId: 17,
      body: dataPermisos,
      success: (resp) => {
        setLoader(false);
        setPermisos(resp.dataList);
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  };

  const handleSave = () => {
    const arrPermisosActive = Array.from(Object.entries(dataPermisos).filter(el => el[1]), el => { return {id_permisos: parseInt(el[0].split("-")[2]), value: el[1]} });
    setLoader(true);
    SaveRequestData({
      queryId: 19,
      body: { PERMISOS: arrPermisosActive, ID_PERFIL: idPerfiles },
      success: (resp) => {
        setLoader(false);
        closeModal()
        alert.success(resp.message)
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  }

  const listPermisosSave = () => {
    setLoader(true);
    SaveRequestData({
      queryId: 20,
      body: { ID_PERFIL: idPerfiles },
      success: (resp) => {
        setLoader(false);
        const arrObject = Object.values({...resp.dataList.map(el => el.id_permisos)});
        let dataObject = {}
        arrObject.forEach((el) => dataObject = { ...dataObject, [`permiso-name-${el}`]: el } )
        setDataPermisos(dataObject)
      },
      error: (err) => {
        setLoader(false);
        const { message, status } = err;
        status < 500 && alert.error(message);
      },
    });
  }

  useEffect(() => {
    getPermisos()
    listPermisosSave()
  }, [])
  
  return (
    <Controls.ModalComponent
      title="Administrar Permisos"
      openModal={openModal}
      closeModal={closeModal}
      className="min-w-[550px]"
    >
      <>
        <Controls.TableComponent>
          <thead>
            <tr>
              <th>id</th>
              <th>Permisos</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {permisos.map((permiso, index) => (
              <tr key={index}>
                <td>{permiso.id_permisos}</td>
                <td>{permiso.permiso}</td>
                <td>
                  <div className="inline-flex">
                    <Controls.CheckboxComponent
                      label={dataPermisos[`permiso-name-${permiso.id_permisos}`] ? "Activo" : "Inactivo"}
                      name={`permiso-name-${permiso.id_permisos}`}
                      id={`permiso-id-${permiso.id_permisos}`}
                      value={dataPermisos}
                      onChange={handleInputFormChange}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Controls.TableComponent>

        <ButtonsSaveComponent handleBack={closeModal} handleAction={handleSave} titleAction="Actualizar" />
      </>
    </Controls.ModalComponent>
  );
};
