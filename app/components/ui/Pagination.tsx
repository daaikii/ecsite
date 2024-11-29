import React from "react";
import { useSearchParams, usePathname } from "next/navigation"

type Props = {
  limit: number;
  itemLength: number;
};


export default function Pagination({ limit, itemLength }: Props) {
  const params = useSearchParams()
  const path = usePathname();

  function createPageUrl(page: Number) {
    const paramsUrl = new URLSearchParams(params.toString());
    paramsUrl.set("page", page.toString());
    return `${path}?${paramsUrl}`
  }

  const currentPage = Number(params.get("page"))
  const totalPage = Math.ceil(itemLength / limit);  //全アイテム数を表示する最大の数で割る
  let startPage = 1
  let endPage = totalPage;

  //全てのpage番号を作成
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="text-right pb-20">

      {itemLength < limit ? <></> :
        <>

          {/* 
          {startPage !== currentPage &&
            <a href={createPageUrl(startPage)} className="border-b-2 border-custom-gray">
              {startPage}...
            </a>
          } */}

          {pageNumbers.map((page) => (
            <a key={page} href={createPageUrl(page)} className={`${currentPage === page && "border-b-2 border-custom-main mx-2"}`}>
              {page}
            </a>
          ))
          }
          {/* 
          {totalPage !== currentPage &&
            <a href={createPageUrl(totalPage)} className="border-b-2 border-custom-gray">
              ...{totalPage}
            </a>
          } */}


        </>
      }
    </div>
  );
};