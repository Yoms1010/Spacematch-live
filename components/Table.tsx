import React from 'react'
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { TableProps } from '@/types';
 
DataTable.use(DT);

function Table({header, title1, title2, title3, title4, title5, title6, title7, handleEdit, handleDelete, children}: TableProps) {

      return (
        <div className='bg-white p-3'>
            <h1 className='mb-4 font-semibold text-2xl'>{header}</h1>
            
            <DataTable className="display ">
                <thead>
                    <tr className='text-left'>
                        <th scope='row'>#</th>
                        <th>{title1}</th>
                        <th>{title2}</th>
                        <th>{title3}</th>
                        <th className='text-left'>{title4}</th>
                        <th>{title5}</th>
                        <th>{title6}</th>
                        <th>{title7}</th>
                    </tr>
                </thead>
                <tbody className='justify-start'>
                    {children}
                </tbody>
            </DataTable>
        </div>    
        );
}

export default Table
