import React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useForm } from '../../../../hooks/useForm';
import useLoaderContext from '../../../../hooks/useLoaderContext';
import { ListConstants } from '../../../../util/ListConstants';

const dataInitial = { CATEGORIAS: "", ESTADO: true }
export default function CategoriasDetailPage() {
  const [data, handleInputChange, , setData] = useForm(dataInitial);
  const navigate = useNavigate();
  const {id} = useParams();
  const {setLoader} = useLoaderContext()
  const alert = useAlert();

  const handleButtonSave = () => {
    setLoader(true)
    SaveRequestData({
      queryId: 22,
      body: {...data, id_categorias: id},
      success: (resp) => {
        setLoader(false)
        alert.success(resp.message)
        navigate("/dashboard/categorias/admin")
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }

  const searchCategoria = () => { 
    setLoader(true)
    SaveRequestData({
      queryId: 21,
      body: { id_categorias: id },
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
    if (id) searchCategoria()
  }, [])

  return (
    <div>
      <div>
        <Controls.CardComponent>
          <div className='flex gap-2'></div>
          <div>
            <div className='grid grid-cols-3 gap-4'>
              <Controls.InputComponent label="Categoria" name="CATEGORIAS" value={data} onChange={handleInputChange} />
              <Controls.SelectComponent label="Estado" name="ESTADO" value={data} list={ListConstants.LIST_ESTADOS} onChange={handleInputChange} />
            </div>
            <div>
              <ButtonsSaveComponent handleBack={() => navigate("/dashboard/categorias/admin")} handleAction={handleButtonSave} />
            </div>
          </div>
        </Controls.CardComponent>
      </div>
    </div>
  )
}