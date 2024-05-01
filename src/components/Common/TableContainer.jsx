import React from 'react';
import { Row } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import GlobalFilter from './GlobalFilter';
import Pagination from '../Molecules/Pagination';

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isLoading,
  isPermissionFilter,
  currentPage,
  totalCount,
  itemsPerPage,
  setFilters,
}) => (
  <>
    <Row className="mb-3">
      {isGlobalFilter && <GlobalFilter isPermissionFilter={isPermissionFilter} setFilters={setFilters} />}
    </Row>
    <div className="table-responsive table-card mt-3 mb-1">
      <table className="table align-middle" id="Table">
        <thead className="table-light">
          <tr>{columns && columns.length > 0 && columns.map(column => <th className="text-muted">{column}</th>)}</tr>
        </thead>
        <tbody className="list form-check-all">
          {isLoading ? (
            Array(10)
              .fill()
              .map((_, i) => (
                <tr key={i}>
                  {columns?.map(index => (
                    <td key={index}>
                      <Skeleton width={100} height={15} />
                    </td>
                  ))}
                </tr>
              ))
          ) : data && data.length > 0 ? (
            data.map((rows, index) => (
              <tr key={index}>
                {rows.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length} className="text-center">
                <div className="noresult">
                  <div className="text-center">
                    <h5 className="mt-2">No Record Found!</h5>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Pagination setFilters={setFilters} currentPage={currentPage} totalCount={totalCount} itemsPerPage={itemsPerPage} />
  </>
);

export default TableContainer;
