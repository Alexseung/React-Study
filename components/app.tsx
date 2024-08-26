import React, {useState} from 'react';
import Box from './box';
// x축 박스 추가, y축 박스 추가, x/y축 박스추가
// x축 추가 = span태그로 옆으로 나란히 div태그로 만든 box가 추가
// y축 추가 = div태그로 아래로 추가
// ** x축, y축에 추가된 박스들의 갯수를 파악하여 그에 맞게 x, y축에 박스가 추가되어야함
// 모두 추가 = x,y축에 들어간 박스 갯수를 파악하여 모든 축에 박스 추가

// x축 박스를 하나 미리 추가해놓지 않으면 x를 단 하나 추가한 후에 박스가 정상 추가됨
// let [xbox, setXBox] = useState<{}[]>([{}]); 기본적으로 한 박스를 추가 ([{---이렇게 추가---}])
// 추가하는 형태로 해결함
// 박스를 많이 추가하면 화면에 다 나오지 않음

export default function () {
  let [xbox, setXBox] = useState<{}[]>([{}]);
  let [ybox, setYBox] = useState<{}[]>([]);

  const xboxLength = xbox.length;

  return (
    <>
      <button
        onClick={() => {
          setXBox([...xbox, xbox]);
        }}
      >
        x축 box 추가
      </button>
      <button
        onClick={() => {
          setYBox([...ybox, ybox]);
        }}
      >
        y축 box 추가
      </button>

      <button
        onClick={() => {
          setXBox([...xbox, xbox]);
          setYBox([...ybox, ybox]);
        }}
      >
        x,y축 box 추가
      </button>
      <div>
        <button
          onClick={() => {
            const removedXBox = xbox.slice(0, -1);
            setXBox(removedXBox);
          }}
        >
          x축 box 제거
        </button>
        <button
          onClick={() => {
            const removedYBox = ybox.slice(0, -1);
            setYBox(removedYBox);
          }}
        >
          y축 box 제거
        </button>
        <button
          onClick={() => {
            const removedXBox = xbox.slice(0, -1);
            const removedYBox = ybox.slice(0, -1);
            // slice(0, -1)에서 -1은 배열의 마지막 값의 인덱스임
            setXBox(removedXBox);
            setXBox(removedYBox);
          }}
        >
          x,y축 box 제거
        </button>
      </div>

      {/* 박스 추가하는 부분 */}
      {/* x박스 추가 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        {xbox.map((v, index) => (
          <div key={index}>
            <Box />
          </div>
        ))}
      </div>

      {/* y박스 추가 */}
      {ybox.map((v, index) => (
        <div key={index} style={{display: 'flex', flexDirection: 'row'}}>
          <Box />
          {/* xbox의 길이만큼을 x축으로 박스 추가 */}
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {/* Array.from으로 새로운 배열 생성, length는 xboxLength에서 1 을 뺀 길이
            (_, i) : 첫 번째 매개변수는 사용안함, 두 번째 매개변수 i 는 현재 요소의 인덱스 */}
            {Array.from({length: xboxLength - 1}, (_, i) => (
              <div key={i}>
                <Box />
              </div>
            ))}
            {/* xboxLength - 1 길이이므로 x축에 3 개의 박스가 있을 경우 y축 박스 추가를 누르면
            y축에 박스 하나를 생성 후 x축 박스 갯수 3 - 1 인 2. 두 개의 박스를 생성
            style로 한 줄에 생기도록 만듦 */}
          </div>
        </div>
      ))}
    </>
  );
}
