import React from "react";

type Props = {
  currentPage: number;
  limit: number;
  itemLength: number;
  path: string
};

export default function Pagination({ currentPage, limit, itemLength, path }: Props) {
  const totalPages = Math.ceil(itemLength / limit);
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-right">
      <a href={`${path}/${currentPage - 1}`}>
        <button
          className={`${currentPage === 1 || itemLength < limit ? "hidden" : ""
            }`}
          disabled={currentPage === 1}
        >
          ＜
        </button>
      </a>
      {
        pageNumbers.map((number, index) => (
          <a key={number} href={`${path}/${number}`}>
            <button
              className={`${currentPage === number ? "border-b-2 border-custom-gray" : ""
                }`}
            >
              {number}
            </button>
            {index == 4 ? "" : " / "}
          </a>
        ))
      }
      <a href={`${path}/${currentPage + 1}`}>
        <button
          className={`${currentPage === totalPages || itemLength < limit ? "hidden" : ""
            }`}
          disabled={currentPage === totalPages}
        >
          ＞
        </button>
      </a>
    </div >
  );
};