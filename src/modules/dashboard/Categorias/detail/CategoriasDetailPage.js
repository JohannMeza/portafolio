import React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Controls from '../../../../components/Controls';
import ButtonsSaveComponent from '../../../../components/layout/form/ButtonsSaveComponent';
import { SaveRequestData } from '../../../../helpers/helpRequestBackend';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { useListEstados } from '../../../../hooks/useListEstados';
import useLoaderContext from '../../../../hooks/useLoaderContext';

const dataInitial = { CATEGORIAS: "", ESTADO: 4 }
export default function CategoriasDetailPage() {
  const validate = (fieldValues = data) =>  {
    let temp = {...errors};
    if ("CATEGORIAS" in fieldValues) {
      temp.CATEGORIAS = fieldValues.CATEGORIAS === "" ? "El campo Categoria es requerido" : "";
    } 

    if ("ESTADO" in fieldValues) {
      temp.ESTADO = !fieldValues.ESTADO ? "El campo Categorias es requerido" : "";
    } 
    
    setErrors({...temp});
    if (fieldValues === data) {
      return Object.values(temp).every((x) => x === '');
    }
  }

  const {data, handleInputFormChange, errors, setErrors, setData} = useFormValidation(dataInitial, true, validate);
  const estados = useListEstados('4,5')
  const navigate = useNavigate();
  const {id} = useParams();
  const {setLoader} = useLoaderContext()
  const alert = useAlert();

  const handleButtonSave = () => {
    if (validate()) {
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
  }

  const searchCategoria = () => { 
    setLoader(true)
    SaveRequestData({
      queryId: 21,
      body: { id_categorias: id },
      success: (resp) => {
        setLoader(false)
        setData(resp.dataObject || dataInitial)
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
              <Controls.InputComponent label="Categoria" name="CATEGORIAS" value={data} onChange={handleInputFormChange} error={errors} />
              <Controls.SelectComponent label="Estado" name="ESTADO" value={data} list={estados} onChange={handleInputFormChange} error={errors} />
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