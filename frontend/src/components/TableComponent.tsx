import React from "react";

interface TableComponentProps {
  cellContents: number[];
}

export function TableComponent({ cellContents }: TableComponentProps) {
  const renderTable = () => {
    const rows = [];

    for (let i = 0; i < 5; i++) {
      const cells = [];
      for (let j = 0; j < 2; j++) {
        const index = i * 2 + j;
        cells.push(
          <td key={j} className="border border-black">
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="text-white p-2 rounded-md shadow-sm">
                {cellContents &&
                Array.isArray(cellContents) &&
                index < cellContents.length
                  ? cellContents[index]
                  : "?"}
              </div>
            </div>
          </td>,
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

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderTable()}
    </div>
  );
}
