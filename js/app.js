//////////////////////////// global variable ////////////////////////////

el = document.querySelector('.image');
let newPosX = 0,
    newPosY = 0,
    startPosX = 0,
    startPosY = 0;

//////////////////////////// 함수 ////////////////////////////

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

function checkLogin() {
    const $id = document.getElementById('id');
    const $pwd = document.getElementById('password');

    if ($id.value != 'julie' || $id.value.trim() === '') {
        $id.style.background = 'lightgrey';
        $id.setAttribute('placeholder', '아이디가 틀렸습니다. 다시 입력해주세요');
        $id.value = '';
        return false;
    }

    if ($pwd.value != 'haewon' || $pwd.value.trim() === '') {
        $pwd.style.background = 'lightgrey';
        $pwd.setAttribute('placeholder', '비밀번호가 틀렸습니다. 다시 입력해주세요');
        $pwd.value = '';
        return false;
    }

    $id.style.background = '';
    $id.setAttribute('placeholder', '아이디를 입력하세요');

    $pwd.style.background = '';
    $pwd.setAttribute('placeholder', '아이디를 입력하세요');
    return true;





}

//////////////////////////// 코드 실행 ////////////////////////////

(function () {

    // // when the user clicks down on the element
    // el.addEventListener('mousedown', function (e) {
    //     e.preventDefault();

    //     // get the starting position of the cursor
    //     startPosX = e.clientX;
    //     startPosY = e.clientY;

    //     document.addEventListener('mousemove', mouseMove);

    //     document.addEventListener('mouseup', function () {
    //         document.removeEventListener('mousemove', mouseMove);
    //     });

    // });

    const $login = document.getElementById('loginBtn');
    $login.addEventListener('click', e => {
        e.preventDefault();
        // console.log('할 일 추가!');

        if (checkLogin()) {
            console.log('flip page and go to next');
            const $loginFlip = document.querySelector('.loginSection');
            $loginFlip.classList.add('page');
            $loginFlip.classList.add('page1')
        }



    });


})();