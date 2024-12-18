import React, { useState, useEffect } from "react";
import styles from "../styles/ItemList.module.css";
import img from "../assets/img/img.svg";
import { Input, Option, Select } from "@material-tailwind/react";
import * as s from "../styles/StyledStore.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import * as m from "../styles/StyledMain.tsx";
import axios from "axios";
import { axiosInToken } from "../../config.js";
import { tokenAtom, memberAtom } from "../../atoms";
import { useAtomValue, useAtom } from "jotai/react";
function ItmListCopy() {
  const [token, setToken] = useAtom(tokenAtom);
  const [ableMiddle, setAbleMiddle] = useState(false);
  const [ableSub, setAbleSub] = useState(false);
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [empty, setEmpty] = useState(null);
  const [usingKeyword, setUsingKeyword] = useState(true);
  const [usingCategory, setUsingCategory] = useState(false);

  const [keyWord, setKeyWord] = useState("");

  const [category, setCategory] = useState({
    ItemCategoryMajorName: "",
    ItemCategoryMiddleName: "",
    ItemCategorySubName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyList, setEmptyList] = useState([]);
  const [pageNumList, setPageNumList] = useState([]);
  const [majorCategoryList, setMajorCategoryList] = useState([]);
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (index) => () => {
    const page = pageList[index];
    navigate(`/mainItemDetail/${page.itemCode}`);
  };

  const handleChangeKeyword = (e) => {
    const value = e.target.value;
    setKeyWord(value);
    setUsingKeyword(true);
    setUsingCategory(false);
  };
  const handleIcon = () => {
    fetchKeywordData(keyWord, 0);
  };

  const handleSelectMajorCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategoryMajorName: value,
      ItemCategoryMiddleName: "",
      ItemCategorySubName: "",
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMajorName: value,
        ItemCategoryMiddleName: "",
        ItemCategorySubName: "",
      },
      0
    );
    fetchMiddleData(value);
  };

  const handleSelectMajorCategoryCopy = (e) => {
    console.log(e.target.value);
    setCategory({
      ...category,
      ItemCategoryMajorName: e.target.value,
      ItemCategoryMiddleName: "",
      ItemCategorySubName: "",
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMajorName: e.target.value,
        ItemCategoryMiddleName: "",
        ItemCategorySubName: "",
      },
      0
    );
    fetchMiddleData(e.target.value);
  };

  const handleSelectMiddleCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategoryMiddleName: value,
      ItemCategorySubName: "",
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMiddleName: value,
        ItemCategorySubName: "",
      },
      0
    );
    fetchSubData(value);
  };

  const handleSelectMiddleCategoryCopy = (e) => {
    console.log(e.target.value);
    setCategory({
      ...category,
      ItemCategoryMiddleName: e.target.value,
      ItemCategorySubName: "",
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategoryMiddleName: e.target.value,
        ItemCategorySubName: "",
      },
      0
    );
    fetchSubData(e.target.value);
  };

  const handleSelectSubCategory = (value) => {
    console.log(value);
    setCategory({
      ...category,
      ItemCategorySubName: value,
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategorySubName: value,
      },
      0
    );
  };

  const handleSelectSubCategoryCopy = (e) => {
    console.log(e.target.value);
    setCategory({
      ...category,
      ItemCategorySubName: e.target.value,
    });

    setUsingKeyword(false);
    setUsingCategory(true);
    fetchCategoryData(
      {
        ...category,
        ItemCategorySubName: e.target.value,
      },
      0
    );
  };
  const fetchMajorData = async () => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/majorCategoryCopy`
      );
      setMajorCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMiddleData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/middleCategoryCopy?categoryName=${value}`
      );

      if (response.data.length > 1) {
        setMiddleCategoryList(response.data);

        setAbleMiddle(true);
        setAbleSub(false);
      } else {
        setAbleMiddle(false);
        setAbleSub(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubData = async (value) => {
    try {
      const response = await axiosInToken(token).get(
        `http://localhost:8080/subCategoryCopy?categoryName=${value}`
      );

      if (response.data.length > 1) {
        setSubCategoryList(response.data);

        setAbleSub(true);
      } else {
        setAbleSub(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchKeywordData = async (keyword, pageNum) => {
    try {
      setLoading(true);
      const response = await axiosInToken(token).get(
        `http://localhost:8080/itemListByKeyword?keyword=${keyword}&pageNum=${pageNum}&pageSize=10`
      );

      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음

      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        // setHasNext(true)
        // setEmptyList([]);
        setPageNumList(
          Array.from(
            { length: 5 },
            (_, index) =>
              response.data.pageable.pageNumber -
              (response.data.pageable.pageNumber % 5) +
              index
          )
        );
      } else {
        // setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          // const emptyListSize = 10 - response.data.numberOfElements;

          // setEmptyList(new Array(emptyListSize).fill(1));

          if (response.data.pageable.pageNumber % 5 === 0) {
            setPageNumList(
              Array.from(
                { length: 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          } else {
            setPageNumList(
              Array.from(
                { length: (response.data.pageable.pageNumber % 5) + 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          }
        } else {
          // setEmptyList([]);

          const pageNumListSize =
            response.data.totalPages -
            Math.floor(response.data.pageable.pageNumber / 5) * 5;

          setPageNumList(
            Array.from(
              { length: pageNumListSize },
              (_, index) =>
                response.data.pageable.pageNumber -
                (response.data.pageable.pageNumber % 5) +
                index
            )
          );
        }
      }

      // if (response.data.pageable.pageNumber > 4) {
      //   setHasPrevious(true);
      // } else {
      //   setHasPrevious(false);
      // }
      console.log(response.data);
      if (response.data.first === true) {
        setHasPrevious(false);
      } else {
        setHasPrevious(true);
      }
      if (response.data.last === true) {
        setHasNext(false);
      } else {
        setHasNext(true);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
      setUsingKeyword(true);
      setUsingCategory(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async (category, pageNum) => {
    try {
      setLoading(true);
      const response = await axiosInToken(token).get(
        `http://localhost:8080/itemListByCategory?ItemCategoryMajorName=${category.ItemCategoryMajorName}&ItemCategoryMiddleName=${category.ItemCategoryMiddleName}&ItemCategorySubName=${category.ItemCategorySubName}&pageNum=${pageNum}&pageSize=10`
      );

      setCurrentPage(response.data.pageable.pageNumber);

      setStartPage(Math.floor(response.data.pageable.pageNumber / 5) * 5);

      setTotalElements(response.data.totalElements);
      setTotalPageNumber(response.data.totalPages);
      //넘어가는 부분이 있음
      if (
        Math.floor(response.data.pageable.pageNumber / 5) <
        Math.floor((response.data.totalPages - 1) / 5)
      ) {
        // setHasNext(true);
        setEmptyList([]);
        setPageNumList(
          Array.from(
            { length: 5 },
            (_, index) =>
              response.data.pageable.pageNumber -
              (response.data.pageable.pageNumber % 5) +
              index
          )
        );
      } else {
        // setHasNext(false);

        //마지막 페이지 확인
        if (response.data.last) {
          // const emptyListSize = 10 - response.data.numberOfElements;

          // setEmptyList(new Array(emptyListSize).fill(1));

          if (response.data.pageable.pageNumber % 5 === 0) {
            setPageNumList(
              Array.from(
                { length: 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          } else {
            setPageNumList(
              Array.from(
                { length: (response.data.pageable.pageNumber % 5) + 1 },
                (_, index) =>
                  response.data.pageable.pageNumber -
                  (response.data.pageable.pageNumber % 5) +
                  index
              )
            );
          }
        } else {
          // setEmptyList([]);

          const pageNumListSize =
            response.data.totalPages -
            Math.floor(response.data.pageable.pageNumber / 5) * 5;

          console.log(Math.floor(response.data.pageable.pageNumber / 5) * 5);

          setPageNumList(
            Array.from(
              { length: pageNumListSize },
              (_, index) =>
                response.data.pageable.pageNumber -
                (response.data.pageable.pageNumber % 5) +
                index
            )
          );
        }
      }
      // if (currentPage > 4) {
      //   setHasPrevious(true);
      // } else {
      //   setHasPrevious(false);
      // }

      if (response.data.first === true) {
        setHasPrevious(false);
      } else {
        setHasPrevious(true);
      }
      if (response.data.last === true) {
        setHasNext(false);
      } else {
        setHasNext(true);
      }

      setPageList(response.data.content);
      setEmpty(response.data.empty);
      setUsingCategory(true);
      setUsingKeyword(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKeywordData("", 0);
      fetchMajorData();
    }
  }, [token]);

  return (
    <>
      <m.CarouselDiv>
        <input type="hidden" id="anPageName" name="page" value="ItemList" />
        <div className={styles["container-center-horizontal"]}>
          <div className={`${styles["ItemList"]} ${styles["screen"]}`}>
            <div className={styles["background"]}>
              <div
                className={`${styles["heading-2"]} ${styles["valign-text-middle"]}`}
              >
                상품 목록
              </div>
              {/* <div
                className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
              >
                {`총${totalElements}건`}
              </div> */}
              <div className={styles["flex-row"]}>
                <div
                  className={`${styles["text-1-1"]} ${styles["valign-text-middle"]}`}
                >
                  {`총${totalElements}건`}
                </div>
                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {/* <div className="select-wrap" style={{ width: "200px" }}> */}
                  {/* <Select label="대분류" onChange={handleSelectMajorCategory}>
                    {majorCategoryList.map((majorCategory, index) => (
                      <Option value={majorCategory.categoryValue} key={index}>
                        {majorCategory.categoryName}
                      </Option>
                    ))}
                  </Select> */}
                  {/* </div> */}
                  <select
                    value={category.ItemCategoryMajorName}
                    onChange={handleSelectMajorCategoryCopy}
                    label="대분류"
                    style={{
                      borderRadius: "7px",
                      width: "120px",
                      height: "40px",
                      backgroundColor: "#f8f8f8",
                      fontSize: "14px",
                      color: "rgb(69,90,100)",

                      borderColor: "rgba(69,90,100,0.5)",
                    }}
                  >
                    {majorCategoryList.map((majorCategory, index) => (
                      <option value={majorCategory.categoryValue}>
                        {majorCategory.categoryName}
                      </option>
                    ))}
                  </select>
                </s.ButtonInnerDiv>

                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {ableMiddle && (
                    // <Select
                    //   label="중분류"
                    //   onChange={handleSelectMiddleCategory}
                    // >
                    //   {middleCategoryList.map((middleCategory, index) => (
                    //     <Option
                    //       value={middleCategory.categoryValue}
                    //       key={index}
                    //     >
                    //       {middleCategory.categoryName}
                    //     </Option>
                    //   ))}
                    // </Select>
                    <select
                      value={category.ItemCategoryMiddleName}
                      onChange={handleSelectMiddleCategoryCopy}
                      label="중분류"
                      style={{
                        borderRadius: "7px",
                        width: "120px",
                        height: "40px",
                        backgroundColor: "#f8f8f8",
                        fontSize: "14px",
                        color: "rgb(69,90,100)",

                        borderColor: "rgba(69,90,100,0.5)",
                      }}
                    >
                      {middleCategoryList.map((middleCategory, index) => (
                        <option value={middleCategory.categoryValue}>
                          {middleCategory.categoryName}
                        </option>
                      ))}
                    </select>
                  )}

                  {!ableMiddle && (
                    <Select label="중분류" disabled>
                      <Option value="">중분류</Option>
                    </Select>
                  )}
                </s.ButtonInnerDiv>

                <s.ButtonInnerDiv
                  className="w-16 p-r-2"
                  style={{ width: "120px" }}
                >
                  {ableSub && (
                    // <Select label="소분류" onChange={handleSelectSubCategory}>
                    //   {subCategoryList.map((subCategory, index) => (
                    //     <Option value={subCategory.categoryValue} key={index}>
                    //       {subCategory.categoryName}
                    //     </Option>
                    //   ))}
                    // </Select>
                    <select
                      value={category.ItemCategorySubName}
                      onChange={handleSelectSubCategoryCopy}
                      label="대분류"
                      style={{
                        borderRadius: "7px",
                        width: "120px",
                        height: "40px",
                        backgroundColor: "#f8f8f8",
                        fontSize: "14px",
                        color: "rgb(69,90,100)",

                        borderColor: "rgba(69,90,100,0.5)",
                      }}
                    >
                      {subCategoryList.map((subCategory, index) => (
                        <option value={subCategory.categoryValue}>
                          {subCategory.categoryName}
                        </option>
                      ))}
                    </select>
                  )}

                  {!ableSub && (
                    <Select label="소분류" disabled>
                      <Option value="">소분류</Option>
                    </Select>
                  )}
                </s.ButtonInnerDiv>

                <div
                  style={{
                    marginLeft: "100px",
                    width: "200px",
                    marginLeft: "230px",
                  }}
                >
                  <Input
                    icon={
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        style={{ cursor: "pointer" }}
                        onClick={handleIcon}
                      />
                    }
                    label="상품명 검색"
                    onChange={handleChangeKeyword}
                  />
                </div>
                <div className={styles["overlap-group"]}>
                  <div
                    className={`${styles["text-6-1"]} ${styles["valign-text-middle"]}`}
                  >
                    상품 등록
                  </div>
                  <div className={styles["small-btn_brown"]}>
                    <div
                      className={`${styles["text-7-1"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                      onClick={() => navigate("/itemInsert")}
                    >
                      상품등록
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["frame-92"]}>
                <div className={styles["frame-87"]}>
                  <div className={styles["cell"]}>
                    <div
                      className={`${styles["text-8"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      카테고리
                    </div>
                  </div>
                  <div className={`${styles["cell-1"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-9"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      상품 코드
                    </div>
                  </div>
                  <div className={`${styles["cell-2"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-10"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      상품정보
                    </div>
                  </div>
                  <div className={`${styles["cell-3"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-11"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                      style={{ marginLeft: "15px" }}
                    >
                      단위
                    </div>
                  </div>
                  <div className={`${styles["cell-3"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-11"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      단위수량
                    </div>
                  </div>
                  <div className={`${styles["cell-4"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-12"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      공급가
                    </div>
                  </div>
                  <div className={`${styles["cell-5"]} ${styles["cell-6"]}`}>
                    <div
                      className={`${styles["text-13"]} ${styles["valign-text-middle"]} ${styles["notosanskr-medium-shark-16px"]}`}
                    >
                      보관상태
                    </div>
                  </div>
                </div>

                {!empty &&
                  pageList.map((page, index) => (
                    <div className={styles["frame"]} key={index}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {`${page.itemMajorCategoryName}/${
                            page.itemMiddleCategoryName
                          }/${
                            page.itemSubCategoryName !== null
                              ? page.itemSubCategoryName
                              : ""
                          }`}
                        </div>
                      </div>
                      <div className={styles["frame-88"]}>
                        <div
                          className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {page.itemCode}
                        </div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-5"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <img
                            onClick={handleNavigate(index)}
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                            src={page.imageUrl}
                            alt="image"
                          ></img>
                          <div className={styles["frame-89"]}>
                            <div
                              className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                              onClick={handleNavigate(index)}
                              style={{
                                wordWrap: "break-word",
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              {page.itemName}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["number"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {page.itemUnit}
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["number"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {page.itemUnitQuantity}
                        </div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {`${page.itemPrice}원`}
                        </div>
                      </div>
                      <div
                        className={`${styles["data-4"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        >
                          {page.itemStorage}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* {!empty &&
                  emptyList.map((page, index) => (
                    <div className={styles["frame"]} key={index}>
                      <div className={styles["data"]}>
                        <div
                          className={`${styles["text-1"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        ></div>
                      </div>
                      <div className={styles["frame-88"]}>
                        <div
                          className={`${styles["a12345"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        ></div>
                      </div>
                      <div
                        className={`${styles["data-1"]} ${styles["data-5"]}`}
                      >
                        <div className={styles["frame-90"]}>
                          <div
                            className={
                              styles["x39607d95d144c4751fedd9d44017d8b7jpg"]
                            }
                          ></div>
                          <div className={styles["frame-89"]}>
                            <div
                              className={`${styles["text-2"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles["data-2"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["number"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        ></div>
                      </div>
                      <div
                        className={`${styles["data-3"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["text-3"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        ></div>
                      </div>
                      <div
                        className={`${styles["data-4"]} ${styles["data-5"]}`}
                      >
                        <div
                          className={`${styles["text-4"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-shark-16px"]}`}
                        ></div>
                      </div>
                    </div>
                  ))} */}
              </div>

              <div style={{ marginTop: "30px" }}>
                <s.PageButtonGroupDiv>
                  <s.ButtonGroupStyle variant="outlined">
                    {!empty && hasPrevious && usingKeyword && (
                      <s.IconButtonStyle
                        onClick={() =>
                          fetchKeywordData(keyWord, currentPage - 1)
                        }
                      >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                    )}
                    {!empty && hasPrevious && usingCategory && (
                      <s.IconButtonStyle
                        onClick={() =>
                          fetchKeywordData(category, startPage - 1)
                        }
                      >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                    )}

                    {/* {usingKeyword && !empty && hasNext && (
                      <>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() => fetchKeywordData(keyWord, startPage)}
                        >
                          {startPage + 1}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 1
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchKeywordData(keyWord, startPage + 1)
                          }
                        >
                          {startPage + 2}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 2
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchKeywordData(keyWord, startPage + 2)
                          }
                        >
                          {startPage + 3}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 3
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchKeywordData(keyWord, startPage + 3)
                          }
                        >
                          {startPage + 4}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 4
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchKeywordData(keyWord, startPage + 4)
                          }
                        >
                          {startPage + 5}
                        </s.IconButtonStyle>
                      </>
                    )}

                    {usingCategory && !empty && hasNext && (
                      <>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() => fetchCategoryData(category, startPage)}
                        >
                          {startPage + 1}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 1
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchCategoryData(category, startPage + 1)
                          }
                        >
                          {startPage + 2}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 2
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchCategoryData(category, startPage + 2)
                          }
                        >
                          {startPage + 3}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 3
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchCategoryData(category, startPage + 3)
                          }
                        >
                          {startPage + 4}
                        </s.IconButtonStyle>
                        <s.IconButtonStyle
                          style={
                            currentPage == startPage + 4
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() =>
                            fetchCategoryData(category, startPage + 4)
                          }
                        >
                          {startPage + 5}
                        </s.IconButtonStyle>
                      </>
                    )} */}

                    {usingKeyword &&
                      !empty &&
                      pageNumList.map((value, index) => (
                        <s.IconButtonStyle
                          style={
                            currentPage == value
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() => fetchKeywordData(keyWord, value)}
                        >
                          {value + 1}
                        </s.IconButtonStyle>
                      ))}

                    {usingCategory &&
                      !empty &&
                      pageNumList.map((value, index) => (
                        <s.IconButtonStyle
                          style={
                            currentPage == value
                              ? { backgroundColor: "skyblue" }
                              : null
                          }
                          onClick={() => fetchCategoryData(category, value)}
                        >
                          {value + 1}
                        </s.IconButtonStyle>
                      ))}

                    {usingKeyword && empty && (
                      <s.IconButtonStyle style={{ backgroundColor: "skyblue" }}>
                        1
                      </s.IconButtonStyle>
                    )}

                    {!empty && hasNext && usingKeyword && (
                      <s.IconButtonStyle
                        onClick={() =>
                          fetchKeywordData(keyWord, currentPage + 1)
                        }
                      >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                    )}

                    {!empty && hasNext && usingCategory && (
                      <s.IconButtonStyle
                        onClick={() =>
                          fetchCategoryData(category, currentPage + 1)
                        }
                      >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                      </s.IconButtonStyle>
                    )}
                  </s.ButtonGroupStyle>
                </s.PageButtonGroupDiv>
              </div>
              {/* <div className={styles["overlap-group"]}>
                <div
                  className={`${styles["text-6-1"]} ${styles["valign-text-middle"]}`}
                >
                  상품 등록
                </div>
                <div className={styles["small-btn_brown"]}>
                  <div
                    className={`${styles["text-7-1"]} ${styles["valign-text-middle"]} ${styles["themewagongithubiosemanticheading-6"]}`}
                    onClick={() => navigate("/itemInsert")}
                  >
                    상품등록
                  </div>
                </div>
              </div> */}
            </div>
            <footer className={styles["footer"]}>
              <div className={styles["footer-contents"]}>
                <div
                  className={`${styles["flex-row-2"]} ${styles["flex-row-3"]}`}
                >
                  <div
                    className={`${styles["flex-col-1"]} ${styles["flex-col-3"]}`}
                  >
                    <div className={styles["overlap-group-1"]}>
                      <p
                        className={`${styles["x"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                      >
                        상호명 : ㈜더블유컨셉코리아 ㅣ 대표자 : 이주철 ㅣ 주소 :
                        서울특별시 강남구 테헤란로 231, EAST동 20층(역삼동,
                        센터필드)
                        <br />
                        사업자등록번호 : 211-88-19183 ㅣ 통신판매업신고 :
                        제2009호-서울강남-00847호
                      </p>
                      <div
                        className={`${styles["text-61"]} ${styles["valign-text-middle"]}`}
                      >
                        사업자정보확인
                      </div>
                      <p
                        className={`${styles["text-62"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                      >
                        │ 개인정보보호책임자 : 허선희 │ 호스팅서비스 : ㈜
                        더블유컨셉코리아
                      </p>
                    </div>
                    <p
                      className={`${styles["copyright"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      COPYRIGHT ⓒ ㈜더블유컨셉코리아 ALL RIGHTS RESERVED
                    </p>
                  </div>
                  <div className={styles["vertical-divider-1"]}></div>
                </div>
                <div
                  className={`${styles["flex-col-2"]} ${styles["flex-col-3"]}`}
                >
                  <p
                    className={`${styles["heading-3"]} ${styles["valign-text-middle"]}`}
                  >
                    <span>
                      <span className={styles["span0"]}>
                        소비자피해보상보험
                        <br />
                      </span>
                      <span className={styles["span1-1"]}>
                        고객님은 안전거래를 위해 현금 결제 시, Wconcept 에서
                        가입한
                        <br />
                        소비자피해보상보험 서비스를 이용하실 수 있습니다.
                      </span>
                    </span>
                  </p>
                  <div className={styles["text-container"]}>
                    <div
                      className={`${styles["text-63"]} ${styles["valign-text-middle"]} ${styles["notosanskr-light-coconut-12px"]}`}
                    >
                      보상대상 : 미배송/반품, 환불거부/쇼핑몰부도
                    </div>
                    <div
                      className={`${styles["text-64"]} ${styles["valign-text-middle"]}`}
                    >
                      서비스 가입사실 확인
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </m.CarouselDiv>
    </>
  );
}

export default ItmListCopy;
