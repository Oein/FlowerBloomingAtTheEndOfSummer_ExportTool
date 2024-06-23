# 여피꽃

여피꽃의 python 파일은 게임에서 직접 추출하세요.

0. 모든 코드 파일들을 프로젝트 루트에 놓고 만들었습니다. 아래에서 사용하는 모든 코드들을 프로젝트 상단으로 이동할것을 권장합니다.
1. python폴더에서 `export/export.ts`를 활용해 대본 코드를 JSON 형태로 추출 (export)
2. `combine/combine.ts`를 활용해 모든 JSON 병합 (combine)
3. `chapterArray/chapterArray.ts`를 활용해 챕터별로 Array화 (chapterArray)
   2번에서 만든 작업물에서 `menu`를 검색해 원하는 선택지로 이동하게 만들어야함
4. `ebook/pagesExporter.ts`를 활용해 복붙할 텍스트 파일로 추출 (out)
5. Apple Pages로 epub제작
