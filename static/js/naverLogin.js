var naver_id_login = new naver_id_login("gFcZMD8oSVXpwjzDiOuF", "5AnI3RgpSM");
var state = naver_id_login.getUniqState();
naver_id_login.setButton("white", 2,40);
naver_id_login.setDomain("http://localhost:3000");
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();
