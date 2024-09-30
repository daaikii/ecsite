import React from "react";
import { useSearchParams, ReadonlyURLSearchParams, usePathname } from "next/navigation"

type Props = {
  limit: number;
  itemLength: number;
};


export default function Pagination({ limit, itemLength }: Props) {
  const params = useSearchParams()
  const path = usePathname();
  const currentPage = Number(params.get("page"))

  //
  // function createPageUrl(page: number) {
  function createPageUrl(page: Number) {
    const paramsUrl = new URLSearchParams(params.toString());
    paramsUrl.set("page", page.toString());
    const url = `${path}?${paramsUrl}`
    return url
  }

  const totalPage = Math.ceil(itemLength / limit);
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPage, currentPage + 2);
  // 前のページと次のページのリンクの表示/非表示条件を変数として定義
  const isPrevPageHidden = currentPage === 1 || itemLength < limit ? "hidden" : "";
  const isNextPageHidden = currentPage === totalPage || itemLength < limit ? "hidden" : "";


  // 現在のページが前半または後半に位置する場合の調整
  if (totalPage <= 5) {
    // 総ページ数が5ページ以下なら全ページを表示
    startPage = 1;
    endPage = totalPage;
  } else if (currentPage <= 3) {
    // 前半のページなら最初の5ページを表示
    startPage = 1;
    endPage = 5;
  } else if (currentPage >= totalPage - 2) {
    // 後半のページなら最後の5ページを表示
    startPage = totalPage - 4;
    endPage = totalPage;
  }


  //全てのpage番号を作成
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="text-right">
      <a href={createPageUrl(Number(params.get("page")) - 1)}
        className={`${isPrevPageHidden}`}
      >
        {"<"}
      </a>

      {startPage !== currentPage &&
        <a href={createPageUrl(startPage)}
          className="border-b-2 border-custom-gray"
        >{startPage}...</a>
      }

      {pageNumbers.map((page) => (
        <a key={page} href={createPageUrl(page)}
          className={`${currentPage === page && "border-b-2 border-custom-gray"}`}
        >{page}</a>
      ))
      }

      {totalPage !== currentPage &&
        <a href={createPageUrl(totalPage)}
          className="border-b-2 border-custom-gray"
        >...{totalPage}</a>
      }

      <a href={`${path}/${currentPage + 1}`}
        className={`${isNextPageHidden}`}
      > {">"}</a>
    </div>
  );
};