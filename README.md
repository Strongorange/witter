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
