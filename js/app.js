//////////////////////////// global variable ////////////////////////////

// 드래그시 가져올 x,y 좌표
let newPosX = 0,
    newPosY = 0,
    startPosX = 0,
    startPosY = 0;

//////////////////////////// 함수 ////////////////////////////

// 드랍다운 안에 있는 아이콘 클릭 이벤트
// has to be fa-regular :)

function eventListenerIcon($iconName) {

    const $listenIcon = document.querySelector(`.dropdown-content > .${$iconName}`);
    $listenIcon.addEventListener('click', e => {

        // 아이콘을 페이지에 추가하기 위해 createElement 하기
        const $newDiv = document.createElement('div');
        $newDiv.classList.add('image');
        $newDiv.innerHTML = `<i class="fa-regular ${$iconName} fa-2x"></i>`;

        const $page = document.querySelector('.page');
        $page.appendChild($newDiv);

        // 드래그 함수 콜
        moveIcon();
        // console.log($page);

        eventClickRemove();
    });
}

// 페이지에 추가된 아이콘을 움직이기 위한 함수
function moveIcon() {

    // list of added icons
    const elList = document.querySelectorAll('.image');

    // when the user clicks down on the element
    elList.forEach(el => el.addEventListener('mousedown', function (e) {
        e.preventDefault();

        // get the starting position of the cursor
        startPosX = e.clientX;
        startPosY = e.clientY;

        document.addEventListener('mousemove', mouseMove);

        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', mouseMove);

        });

        function mouseMove(e) {
            // calculate the new position
            newPosX = startPosX - e.clientX;
            newPosY = startPosY - e.clientY;

            // with each move we also want to update the start X and Y
            startPosX = e.clientX;
            startPosY = e.clientY;

            // set the element's new position:
            el.style.top = (el.offsetTop - newPosY) + "px";
            el.style.left = (el.offsetLeft - newPosX) + "px";
        }

    }));

}

// login id and password validation 
function validateLogin() {
    const $id = document.getElementById('id');
    const $pwd = document.getElementById('password');

    // if the id is different or empty, login failed
    if ($id.value != 'julie' || $id.value.trim() === '') {
        $id.style.background = '#dcdcdc';
        $id.setAttribute('placeholder', '아이디가 틀렸습니다. 다시 입력해주세요');
        $id.value = '';
        return false;
    }

    // if the password is different or empty, login failed
    if ($pwd.value != 'haewon' || $pwd.value.trim() === '') {
        $pwd.style.background = 'lightgrey';
        $pwd.setAttribute('placeholder', '비밀번호가 틀렸습니다. 다시 입력해주세요');
        $pwd.value = '';
        $id.style.background = '';
        return false;
    }

    // if all matches, reset background and return true
    $id.style.background = '';
    $pwd.style.background = '';
    return true;

}

// 로그인 성공시 다음 페이지로 넘어가기
function eventLogin() {

    const $login = document.getElementById('loginBtn');
    $login.addEventListener('click', e => {
        e.preventDefault();

        if (!validateLogin()) {
            return;
        } else {
            const $loginSection = document.querySelector('#note > .loginSection');
            const $page = document.querySelector('#note > .page');
            const $navigation = document.querySelector('.nav');
            const $noteBtnList = document.querySelector('.noteBtnList');
            const $pageNum = document.querySelector('.pageNum');

            $loginSection.style.display = 'none';
            $page.style.display = 'block';
            $navigation.style.visibility = '';
            $noteBtnList.style.display = '';
            $pageNum.style.display = '';

        }

        // const $loginFlip = document.querySelector('.loginSection');

        // $loginFlip.classList.add('page');
        // $loginFlip.classList.add('page1');
    });

}

// 드랍다운 박스 나오기/들어가기 이벤트
function eventDropDown() {

    const $iconBtn = document.querySelector('.iconDropdown');
    const $dropDown = document.querySelector('.dropdown-content');

    // select icon mouseover, dropdown
    $iconBtn.addEventListener('mouseover', e => {
        $dropDown.style.display = 'block';
        // select icon mouseleave, dropdown disappears
        $iconBtn.addEventListener('mouseleave', e => {
            $dropDown.style.display = 'none';
        });
    });

}


// 아이콘 더블클릭 시 삭제
function eventClickRemove() {
    // list of added icons
    const trashList = document.querySelectorAll('.image');

    // when the user clicks down on the element
    trashList.forEach(el => el.addEventListener('dblclick', function (e) {
        e.preventDefault();

        el.parentElement.removeChild(el);

    }));
}

// login initially, and open note
function initialize() {

    const $page = document.querySelector('#note > .page');
    const $navigation = document.querySelector('.nav');

    const $noteBtnList = document.querySelector('.noteBtnList');
    const $pageNum = document.querySelector('.pageNum');

    // 로그인 페이지만,,,
    // $page.style.display = 'none';
    // $navigation.style.visibility = 'hidden';
    // $noteBtnList.style.display = 'none';
    // $pageNum.style.display = 'none';

}

//////////////////////////// 코드 실행 ////////////////////////////

(function () {


    initialize();

    const $loginSection = document.querySelector('#note > .loginSection');
    if ($loginSection != null) {
        eventLogin();
    }

    // hover to show dropdown menu
    eventDropDown();

    // add event listener for each icons
    eventListenerIcon('fa-address-card');
    eventListenerIcon('fa-credit-card');
    eventListenerIcon('fa-bell');
    eventListenerIcon('fa-hand-point-up');
    eventListenerIcon('fa-heart');
    eventListenerIcon('fa-hospital');
    eventListenerIcon('fa-square-check');

    ShowPage2();

})();



// Page2 구현
function ShowPage2() {
  const noteData = [
    {
      pageNum: 1,
      text: "",
      isAddOrNext: "+",
      IsPrev: false,
      tags: "",
      icon: {
        iconArr: []
      },
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
      icon: {
        iconArr: []
      },
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

    //////////////////////////////////////////////////
    const $imageList = document.querySelectorAll(".image");
    // 이모티콘이 있을경우, 객체에 저장하고 removeChild
    if ($imageList != null) {
      for (let image of $imageList) {
        if (!noteData[globalpageNumber - 1].icon.iconArr.includes(image)){
          noteData[globalpageNumber - 1].icon.iconArr.push(image);
        }
        $page.removeChild(image);
      }
    }
    //////////////////////////////////////////////////

    if (target.classList.contains("prev")) return;
    noteData[globalpageNumber - 1].isAddOrNext = ">";

    console.log("SavePageData(next)만 나옴 :", noteData[globalpageNumber - 1]);
  }

  /* 선택한 페이지 보여주는 함수 */
  function ShowMeThePage(whereTo) {
    $pageNum.textContent = `- ${globalpageNumber} -`;
    $page2.textContent = noteData[globalpageNumber - 1].text;
    $next.textContent = noteData[globalpageNumber - 1].isAddOrNext;

    //////////////////////////////////////////////////
    // 이모티콘이 있었을 경우, 객체에 저장된 img appendChild

    if (noteData[globalpageNumber - 1].icon != null) {
      for (let image of noteData[globalpageNumber - 1].icon.iconArr) {
        console.log(image.innerHTML);
        $page.appendChild(image);      
      }
    }
    
    //////////////////////////////////////////////////

    console.log("ShowMeThePage :", noteData[globalpageNumber - 1]);
  }

    //////////////////////////////////////////////////
  const $page = document.querySelector(".isIcon");
    //////////////////////////////////////////////////

  const $page2 = document.querySelector(".page2");
  const $next = document.querySelector(".next");
  const $pageNum = document.querySelector(".pageNum");
  const $btnList = document.querySelector(".noteBtnList");
  let globalpageNumber = 1;

  $btnList.addEventListener("click", function (e) {
    // next(+/>) or prev(<)

    const $target = e.target;
    SavePageData($target); // 버튼을 클릭하면 무조건 저장
    // console.log(globalpageNumber);

    $next.previousElementSibling.textContent = "<";

    if ($target.classList.contains("prev")) {
      globalpageNumber--;
      if (globalpageNumber === 1) {
        {
          $next.previousElementSibling.textContent = '';
        }
      }
      ShowMeThePage('prev');
    } else {
      globalpageNumber++;
      $next.textContent === "+" ? AddNewPageObject() : ShowMeThePage('next');
    }
  });
}
