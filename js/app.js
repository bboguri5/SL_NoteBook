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
function checkLogin() {

    const $id = document.getElementById('id');
    const $pwd = document.getElementById('password');

    // if the id is different or empty, login failed
    if ($id.value != 'julie' || $id.value.trim() === '') {
        $id.style.background = 'lightgrey';
        $id.setAttribute('placeholder', '아이디가 틀렸습니다. 다시 입력해주세요');
        $id.value = '';
        return false;
    }

    // if the password is different or empty, login failed
    if ($pwd.value != 'haewon' || $pwd.value.trim() === '') {
        $pwd.style.background = 'lightgrey';
        $pwd.setAttribute('placeholder', '비밀번호가 틀렸습니다. 다시 입력해주세요');
        $pwd.value = '';
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
        const $loginFlip = document.querySelector('.loginSection');

        $loginFlip.classList.add('page');
        $loginFlip.classList.add('page1');
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

function eventClickRemove() {
    // list of added icons
    const trashList = document.querySelectorAll('.image');
    
    // when the user clicks down on the element
    trashList.forEach(el => el.addEventListener('dblclick', function (e) {
        e.preventDefault();
    }));
}

//////////////////////////// 코드 실행 ////////////////////////////

(function () {

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


    // if (checkLogin()) {
    //     eventLogin();
    // }


})();