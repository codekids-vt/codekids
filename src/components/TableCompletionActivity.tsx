import React, { Dispatch, SetStateAction, useState } from 'react';
import { NumberInputActivity } from './NumberInputActivity';


export interface ITableCompletionActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: number[];
  answer: number;
  initialImage: string;
  correctImage: string;
}

export function TableCompletionActivity({ props, setAllowNext }: { props: any | ITableCompletionActivityProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {
  const renderTable = () => {
    const rows = [];
    const tableItems = props.tableItems;

    for (let i = 0; i < tableItems.length; i++) {
      const cells = [];
      for (let j = 0; j < tableItems[i].length; j++) {
        cells.push(
          <td key={j} className="border border-black">
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="text-white p-2 rounded-md shadow-sm">
                {tableItems[i][j]}
              </div>
            </div>
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <table className="border-collapse border bg-primary-green border-black">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  const INumberInputActivityProps = {
    ans: props.ans,
    options: props.options,
    showIOLabels: false,
  };

  console.log(INumberInputActivityProps);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderTable()}
      <NumberInputActivity props={INumberInputActivityProps} setAllowNext={setAllowNext} />
    </div>
  );
}