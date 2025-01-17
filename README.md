TCP 소켓 프로그래밍 실습

 이 프로젝트는 TCP 소켓 프로그래밍 실습을 위해 작성되었습니다.

 

## 소개
 이 프로젝트는 TCP소켓 프로그래밍 실습을 위해 작성되었습니다.

 서버는 유저의 위치 데이터를 받아서 내부 로직을 처리한 뒤, 각 플레이어에게 위치 데이터를 전송합니다.

- **목표**: TCP소켓 프로그래밍을 통한 실시간 데이터 통신 및 처리 기능 실습
- **사용 기술**: node.js, web socket, mysql2, protobufjs

## 구현된 기능
- tcp 소켓 서버 실행
- protobufjs를 이용해 패킷 프로토콜 작성
- mysql2로 로컬 mysql서버에서 raw쿼리 실행
- 유저 접속 및 접속 종료 시 db에서 위치 정보 불러오기, 저장
- 유저 위치 정보 동기화(추측항법 기법 적용)

## 문제 해결
1. 패킷 헤더 작성
- **문제**: 클라이언트에서 패킷을 수신했을 때 정상적으로 디코딩하지 못하는 문제.
- **해결**: 서버측에서 패킷 헤더 길이를 잘못 작성하고 있었다.
2. 패킷 프로토 작성
- **문제**: 클라이언트-서버 간 패킷 전송시에 데이터를 역직렬화 하는 문제
- **해결**: 프로토를 작성해서 프로토콜을 일치시켰다.
3. 추측 항법(Dead Reckoning) 기법 적용
- **문제**: 추측 항법 기법 적용시에, 유저 위치 데이터가 정상적으로 계산되지 않는 문제
- **해결**: 서버에서 유저 위치 정보를 생성할 때, 각 유저들의 데이터를 추가하는게 아니라 고정된 값을 추가하는 문제가 있었다. 각 유저에게 추측 항법을 적용해서 해결했다.
4. 유저 접속 종료시에 DB에서 정상적으로 쿼리가 실행되지 않음
- **문제**: DB에 유저 위치 데이터를 저장하는 쿼리가 정상적으로 작동하지 않음
- **해결**: 쿼리 syntax에 오류가 있었다.
5. 둘 이상의 클라이언트 인스턴스로 테스트 환경 조성
- **문제**: 클라이언트를 빌드 하지 않고 유니티 에디터 상에서 둘 이상의 클라이언트 인스턴스를 사용해서 테스트 해야 하는 문제
- **해결**: parrel sync 에셋을 사용했다.

## 결과
- 웹소켓 서버를 정상적으로 실행하고 클라이언트의 연결을 받을 수 있다.
- 클라이언트에게 주기적으로 핑을 보내고 레이턴시를 측정할 수 있다.
- protocol buffer라이브러리를 사용해서 서버-클라이언트 간 패킷 프로토콜을 정의할 수 있다.
- mysql2라이브러리를 사용해서 로컬 데이터베이스에 연결하고, raw query를 실행할 수 있다.
- 유저의 위치 데이터와 세션의 평균 레이턴시를 기반으로 추측 항법을 적용할 수 있다.
- parrel sync 라이브러리를 사용해서 둘 이상의 클라이언트 인스턴스를 생성해 테스트할 수 있다.
## 개선
- 연결이 비정상적으로 종료되었을 때의 예외처리
