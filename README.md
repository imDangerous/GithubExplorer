# GithubExplorer

깃허브 내 저장소를 찾아 이슈를 확인할 수 있는 간단한 React Native 예제

## 주요기능

- 검색한 저장소를 최대 4개까지 저장하고 관리할 수 있음 
- 저장소 검색은 저장소 이름과 소유자(선택)로 검색할 수 있음 
- 저장소와 이슈 목록은 무한스크롤 기능으로 더 불러오기를 구현함
- 로컬 데이터는 Context와 AsyncStorage를 이용하여 관리함
- React Query를 이용하여 깃허브와 데이터 연동
- Styling은 Styled Components를 이용하여 구성함

## 개발/테스트 환경

- IntelliJ
- Node 16.13.1 (NPM 8.1.2)
- Cocoapods 1.11.2
- Ruby 2.7.4
- React Native 0.67.2 (with TypeScript)
- iPhone 13 Pro 15.0 (Simulator)
- Android API30 (Simulator)


## 빌드

> 💡 Git Clone해서 빌드했을 때는 특이점이 없었습니다.


제 개발 환경 때문인지 모르겠으나, 프로젝트 생성시 Cocoapods 관련해서 특이점이 있었습니다.  
개발 환경 차이로 빌드시 문제가 될 수 있을 것 같으니 꼭 확인 부탁드립니다.

### 빌드 특이사항

> 💡 빌드시 확인해주세요


## 소스 구조
| Name       | Description                   |
|------------|-------------------------------|
| assets     | Font, Image 애셋으로 구성           |
| components | 주요 컴포넌트를 확장 및 재사용 가능한 방식으로 구성 |
| constants  | 공통 상수 관리                      |
| context    | ContextAPI                    |
| networks   | Github 데이터 연동                 |
| resources  | assets을 이용하기 위한 상수 정의         |
| screens    | 화면 단위로 관리                     |
| theme      | 화면 구성을 위한 테마 정의               |
| utils      | 주요 공통 기능을 관리                  |


## 스크린 설명

| Name              | Description                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| SplashScreen      | 초기화 및 간단한 인트로 화면 구현                                                                                                                  |
| HomeScreen        | 홈 화면, 사용자가 등록한 저장소 4개를 리스트화 하고 제거할 수 있음.  상단 검색 버튼으로 저장소를 검색할 수 있음.                                                                  |
| RepositoryScreen  | 깃허브 저장소 검색 및 검색 결과를 리스트화 함. 검색된 저장소를 추가/제거 할 수 있음. 저장소를 클릭하면 저장소의 이슈 리스트를 확인할 수 있음                                                   |
| IssueScreen       | 특정 저장소의 이슈를 리스트화 함. 이슈를 클릭하면 해당 이슈의 디테일 정보를 확인할 수 있음.                                                                                |
| IssueDetailScreen | 특정 이슈의 상세 정보를 확인할 수 있음                                                                                                               |


