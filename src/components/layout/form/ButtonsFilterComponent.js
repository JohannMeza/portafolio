import React from 'react';
import Controls from '../../Controls';

export default function ButtonsFilterComponent ({ handleClear, handleFilter }) {
  return (
    <div className='flex gap-4 justify-center mt-4'>
      <Controls.ButtonComponent title="Borrar Selección" className="color-secondary" onClick={handleClear} />
      <Controls.ButtonComponent title="Filtrar" className="color-primary" onClick={handleFilter} />
    </div>
  )
}