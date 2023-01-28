import React from 'react';

export default function TableComponent ({children}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="table-base">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}