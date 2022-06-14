import React from "react";

const Page = ({ number, setNumber, setPage, page }) => {
  return (
    <div className="d-flex align-items-center mt-auto">
      <span className="text-muted small d-none d-md-inline">
        Showing 10 of 100
      </span>
      {/* 100개중에 10개를 보여주는데 이것도 데이터 받아서 구현할꺼면 해야함
                아래 부분은 페이징 처리 부분 JPA로 처리해야함 */}
      <nav aria-label="Page navigation example" className="ms-auto">
        <ul className="pagination my-0">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setNumber(number - 3)}
              disabled={number === 0}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(0 + number)}
              aria-current={page === number ? "page" : null}
            >
              {number + 1}
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(1 + number)}
              aria-current={page === number ? "page" : null}
            >
              {number + 2}
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setPage(2 + number)}
              aria-current={page === number ? "page" : null}
            >
              {number + 3}
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setNumber(number + 3)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Page;
