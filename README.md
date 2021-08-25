https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#persistence

onAuthStaeChanged 를 통해 유저의 로그인,로그아웃 상황을 감시할 수 있음

```
    const toggleAccount = () => setNewAccount((prev) => !prev);
```

useState 의 set~~` 에서 인자를 사용하면 현재값을 사용가능

socialLogIn 을 구현하기 위해서 Provider 사용
https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signinwithpopup
https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider?authuser=0

useHistory 를 이용해서 Redirect 가능
혹은 Redirect Component 를 사용해서 from to 방식으로도 사용가능

firestore 를 사용해서 DB 생성가능
https://firebase.google.com/docs/reference/js/firebase.firestore?authuser=0
https://firebase.google.com/docs/reference/js/firebase.firestore.Firestore?authuser=0#collection
https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#add
onSubmit 할때마다 db에 저장

get을 사용해서 꺼내옴
https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#get

```
    dbWeets.forEach((document) => {
      setWeets((prev) => [document.data(), ...prev]);
    });
```

# SnapShot

weets 콜렉션에 SnapShot 이라는 Listener 를 붙혀줌 해당 콜렉션이 바뀔대마다 동작

userObj 를 App 에 만들어서 유저 정보를 Home 으로 전달해 uid 도 weet 에 넣어줌!

useEffect에 의존성에 empty array를 줬는데 어떻게 계속 명령이 실행되는거죠?? empty array를 의존성에 주면 처음 한번만 실행되는거 아닌가요?
We use [] because we only want to subscribe ONCE, after we are subscribed we update the tweets with the data from Firebase.

# 삭제

https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference?authuser=0#doc
https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?authuser=0#delete
클릭 이벤트로 삭제

```
const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this weet?");
    if (ok) {
      //delete weet
      await dbService.doc(`weets/${weetObj.id}`).delete(); //doc의 주소? 를 알고있음 doc은 firestore 사이트 페이지의 "문서"
    }
  };
```
