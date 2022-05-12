el = document.querySelector(".image");
let newPosX = 0,
  newPosY = 0,
  startPosX = 0,
  startPosY = 0;

// when the user clicks down on the element
el.addEventListener("mousedown", function (e) {
  e.preventDefault();

  // get the starting position of the cursor
  startPosX = e.clientX;
  startPosY = e.clientY;

  document.addEventListener("mousemove", mouseMove);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", mouseMove);
  });
});

function mouseMove(e) {
  // calculate the new position
  newPosX = startPosX - e.clientX;
  newPosY = startPosY - e.clientY;

  // with each move we also want to update the start X and Y
  startPosX = e.clientX;
  startPosY = e.clientY;

  // set the element's new position:
  el.style.top = el.offsetTop - newPosY + "px";
  el.style.left = el.offsetLeft - newPosX + "px";
}

ShowPage2();

// Page2 구현
function ShowPage2() {
  const noteData = [
    {
      pageNum: 1,
      text: "",
      isAddOrNext: "+",
      IsPrev: false,
      tags: "",
    },
  ];

  /* 객체 데이터 추가 함수 */
  function AddNewPageObject() {
    const defalutNoteData = {
      pageNum: globalpageNumber,
      text: "",
      isAddOrNext: "+",
      IsPrev: true,
      tags: "",
    };

    noteData[globalpageNumber - 1] = defalutNoteData; //새 객체 추가
    $pageNum.textContent = `- ${globalpageNumber}- `; //추가된 페이지 번호만 변경
    $page2.textContent = ""; // 내용 리셋
    console.log("AddNewPageObject :", noteData);
  }

  /* 데이터 저장 함수 */
  function SavePageData(target) {
    noteData[globalpageNumber - 1].text = $page2.textContent;
    noteData[globalpageNumber - 1].tags = "추가시 표/이미지태그";

    if (target.classList.contains("prev")) return;
    noteData[globalpageNumber - 1].isAddOrNext = ">";

    console.log("SavePageData(next)만 나옴 :", noteData[globalpageNumber - 1]);
  }

  /* 선택한 페이지 보여주는 함수 */
  function ShowMeThePage() {
    $pageNum.textContent = `- ${globalpageNumber} -`;
    $page2.textContent = noteData[globalpageNumber - 1].text;
    $next.textContent = noteData[globalpageNumber - 1].isAddOrNext;

    console.log("ShowMeThePage :", noteData[globalpageNumber - 1]);
  }

  const $page2 = document.querySelector(".page2");
  const $next = document.querySelector(".next");
  const $pageNum = document.querySelector(".pageNum");
  const $btnList = document.querySelector(".noteBtnList");
  let globalpageNumber = 1;

  $btnList.addEventListener("click", function (e) {
    // next(+/>) or prev(<)

    const $target = e.target;
    SavePageData($target); // 버튼을 클릭하면 무조건 저장
    console.log(globalpageNumber);

    $next.previousElementSibling.textContent = "<";

    if ($target.classList.contains("prev")) {
      globalpageNumber--;
      if (globalpageNumber === 1) {
        {
          $next.previousElementSibling.textContent = '';
        }
      }
      ShowMeThePage();
    } else {
      globalpageNumber++;
      $next.textContent === "+" ? AddNewPageObject() : ShowMeThePage();
    }

    // if (e.target.classList.contains("prev")) {// 이전
    //   globalpageNumber--; // 현재페이지번호 - 1 = 이전페이지번호
    //   ShowPage(); // 이전페이지 보여주기
    // } else {
    //   globalpageNumber++; // 현재페이지번호 + 1 = 다음페이지번호
    //   $next.textContent === "+" ? AddNewPageObject() : ShowPage(); // + 이면 add / > 이면 다음페이지보여주기
    // }
  });
}
