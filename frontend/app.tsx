import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useDeferredValue,
  useTransition,
} from 'react';

////////////////useRef////////////////
// export default function () {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(0);

//   const countIncrement = () => setCount(count + 1);
//   const countRefIncrement = () => {
//     countRef.current = countRef.current + 1;
//   };
//   const multiplyCountRef = () => {
//     countRef.current = countRef.current * 2;
//   };

//   return (
//     <div>
//       <div>{count} : 이건 계속 바뀜</div>
//       <div>{countRef.current} : 이건 값 저장했다가 바뀜</div>
//       <button onClick={countIncrement}>count증가 / 전체 렌더링</button>
//       <button onClick={countRefIncrement}>countRef증가</button>
//       <button onClick={multiplyCountRef}>countRef곱하기 2</button>
//     </div>
//   );
// }

////////////////useMemo,useCallback////////////////
// export default function () {
//   const [number, numberChanger] = useState(0);
//   const [memo, memoChanger] = useState(true);

//   const increment = () => numberChanger(number + 1);

//   const p = useMemo(() => {
//     return number;
//   }, [memo]);

//   const pFun = useCallback(() => {
//     memoChanger(!memo);
//   }, [p]);

//   return (
//     <div>
//       <p>{number}</p>
//       <p>{p}</p>
//       <button onClick={increment}>그냥 버튼</button>
//       <button onClick={pFun}>memo 버튼</button>
//       <div
//         style={{
//           backgroundColor: memo ? 'black' : 'white',
//           color: memo ? 'white' : 'black',
//         }}
//       >
//         {memo ? 'memo는 지금 true임' : 'memo지금 false입니다'}
//       </div>
//     </div>
//   );
// }

////////////////useDefferredValue, useTransition////////////////
// export default function () {
//   const [a, ac] = useState(0);
//   const [b, bc] = useState(1);
//   const [c, cc] = useState(2);
//   const [isPendding, startWith] = useTransition();

//   // const d = useDeferredValue(a)

//   // console.log({a},{b},{c},{d});
//   // {a: 1} {b: 2} {c: 3} {d: 0}
//   // {a: 1} {b: 2} {c: 3} {d: 1}
//   // d는 나중에 바뀜
//   console.log(isPendding, {a}, {b}, {c});
//   // {a: 0} {b: 2} {c: 3}
//   // {a: 1} {b: 2} {c: 3}
//   // a만 나중에 증가

//   return (
//     <div
//       onClick={() => {
//         startWith(() => {
//           ac(a + 1);
//         });
//         bc(b + 1);
//         cc(c + 1);
//       }}
//     >
//       {/* {d}{b}{c} */}
//       {a}
//       {b}
//       {c}
//     </div>
//   );
// }
// a가 바뀌면서 렌더링, b가 바뀌고 렌더링, c가 바뀌고 렌더링
// 총 3번의 렌더링이 일어나고 내가 부른 순서, ac bc cc 라는 순서로 렌더링이됨
// 이러한 순서에 변화를 줄때

// const d = useDeferredValue(a) 라고 명명해놨으니 {d}를 사용
// a가 바뀐다고해도 d는 바뀌지않고 나머지가 전부 다 바뀔때까지 기다림
// 결과적으로 a가 바뀌고 d도 바뀌지만 그 결과를 내는 속도를 늦춤

////////////////custom Hook  clamp////////////////
// export default function hook(
//   min: number | 'infinite' = 0,
//   max: number | 'infinite' = 'infinite',
//   now: number | 'min' | 'max' = 'min'
// ) {
//   const [value, valueChanger] = useState(
//     now == 'min'
//       ? min != 'infinite'
//         ? min
//         : max != 'infinite'
//         ? max - 1
//         : 0
//       : now == 'max'
//       ? max != 'infinite'
//         ? max
//         : min != 'infinite'
//         ? min + 1
//         : 0
//       : now
//   );
//   const Update = useCallback((target: number) => {
//     if (min != 'infinite' && target < min) valueChanger(min);
//     else if (max != 'infinite' && target > max) valueChanger(max);
//     else valueChanger(target);
//   }, []);
//   const Increment = (increment: number) => {
//     if (max != 'infinite' && value + increment > max) valueChanger(max);
//     else valueChanger(value + increment);
//   };
//   const Decrement = (decrement: number) => {
//     if (min != 'infinite' && value - decrement < min) valueChanger(min);
//     else valueChanger(value - decrement);
//   };
//   return {value, Update, Increment, Decrement};
// }

////////////////custom Hook  toggle////////////////

// export default function hook(def: boolean = true) {
//   const [value, valueChanger] = useState(def);
//   const Toggle = () => {
//     valueChanger(!value);
//   };
//   const On = useCallback(() => {
//     valueChanger(true);
//   }, []);
//   const Off = useCallback(() => {
//     valueChanger(false);
//   }, []);
//   return {value, Toggle, On, Off};
// }

////////////////////////////////////////// 숙제 //////////////////////////////////////////////////
// 사과, 바나나, 멜론 정보를 표시하는 페이지
// 각 과일은 이미지, 이름, 정보, 자생지(테이블로 2개 이상 입력)
// 이미지는 이름을 누르면 안보이다가 다시 누르면 보이게
// 정보는 마우스를 올리면 글자가 굵어지고 마우스를 안올리면 원래대로 돌아오게
////////////////////////////////////////// 숙제 //////////////////////////////////////////////////

import {useToggle} from '../hook';

class Fruit {
  name: string;
  img: string;
  info: string;
  place: string;

  constructor(name: string, img: string, info: string, place: string) {
    this.name = name;
    this.img = img;
    this.info = info;
    this.place = place;
  }
}

function FruitItem({fruit}: {fruit: Fruit}) {
  const [mouseHover, hoverChanger] = useState(false);

  const handleMouseHover = () => {
    hoverChanger(true);
  };
  const handleMouseOut = () => {
    hoverChanger(false);
  };

  const {value, Toggle, On, Off} = useToggle(false);
  return (
    <div style={{border: '1px solid black'}}>
      <div onClick={Toggle}>사진</div>
      {value && (
        <img
          src={fruit.img}
          style={{width: '200px', height: '200px'}}
          onClick={Off}
        />
      )}

      <h3>{fruit.name}</h3>
      <p
        style={{fontWeight: mouseHover ? '600' : '200'}}
        onMouseOver={handleMouseHover}
        onMouseOut={handleMouseOut}
      >
        {fruit.info}
      </p>
      <p>{fruit.place}</p>
    </div>
  );
}

export default function FruitList() {
  const fruits: Fruit[] = [
    new Fruit(
      '사과',
      'https://d2phebdq64jyfk.cloudfront.net/media/image/article/thumbnail/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%89%E1%85%B5%E1%86%AB_1-30.jpg',
      `과육은 기본적으로 노란색에서 연두색[2]이며, 맛은 품종마다 다르다.

일반적으로 한국에서 말하는 사과 맛은 달콤새콤 + 아삭아삭하게 씹히는 탄력이 있고 단단한 과육의 식감을 말한다. 종마다 다르지만 잘 익은 사과는 껍질이 벗겨지지 않은 상태에서도 청량감이 있는 좋은 냄새가 난다.

'사과(沙果, 모래열매)'라는 이름은 입자가 마치 모래와 같다고 하여 붙여졌다. 출처 사과를 오래 두면 수분과 펙틱화합물(pectic compounds)이 감소하면서 과실의 경도가 낮아져 푸석푸석 해지는데 이를 보면 왜 '사과'라는 이름이 붙은 것인지 잘 알 수 있을 것이다.

나이가 많은 기성세대 일부는 간혹 사과를 두고 능금이라 잘못 부르기도 한다. 능금은 Malus asiatica를 말하기 때문에 사과의 근연종일 뿐 서로 다른 종이라 구별해서 불러야 한다.`,
      '여주'
    ),
    new Fruit(
      '바나나',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkntanSrcb8EKzr501R_rVBBf4iU0r-YJfA&s',
      `파초과(Musaceae) 바나나 속(Musa)에 속하는 종 중 과실을 식용하는 종들. 일반적으로 무사 아쿠미나타(Musa acuminata) 종들과 이들과 1820년 이탈리아의 변호사 겸 정치인이자 식물학자인 루이지 알로이시우스 콜라(Luigi Aloysius Colla, 1766 ~ 1848)가 처음 소개한 무사 발비시아나(M. balbisiana) 종의 교배종들이 식용으로 사용된다.`,
      '필리핀'
    ),
    new Fruit(
      '포도',
      'https://i.namu.wiki/i/hMr9MtxFJBGYo9sn4gvATlRK-s4k6LeJ2ILYHj1SUR9aplhMUgIBnoB3tR8wmlDYkYR0a2nj3Yjb3jRXf3pJcA.webp',
      `포도(葡萄[1], grape[2])는 포도과의 낙엽 활엽 덩굴성 나무 및 그 열매를 이르는 말이다.

포도의 색상은 흔히 보라색으로 표현되지만, 재배되는 품종에 따라서 매우 다양한 색상을 나타낸다. 큰 분류에서는 대개 3색 - 포도[3](보라색, blue grape) 청포도(녹색[4], white[5] grape), 적포도(적색[6], red grape) 정도로 구분하는 편이다. 한국에서 재배되는 종은 주로 보라색 계열의 생식용 포도들로 다른 포도들은 찾기 어려웠으나, 21세기 들어 샤인머스캣 등을 필두로 재배종의 다양화와 수입과일의 보편화가 이루어지며 청포도, 적포도 계열의 포도도 한국에서 찾아볼 수 있게 되었다.

원산지는 오늘날의 중동 지역이다. 현재의 조지아 지역에 위치한, 지금으로부터 약 8000년 전의 고대 유적에서 포도씨가 발견된 것으로 보아, 인간이 포도를 재배한 것은 그 이전으로 추정된다. 한반도에는 삼국시대 무렵 전래된 것으로 보인다.# 경기도 안성시에는 프랑스인 선교사 앙투안 공베르 신부가 들여온 포도가 유명하다.`,
      '영동'
    ),
    new Fruit(
      '딸기',
      'https://newsimg.sedaily.com/2022/12/26/26F1XH6JQL_1.png',
      `딸기는 쌍떡잎식물의 이판화군 장미목 장미과의 여러해살이풀 혹은 그 열매[1]를 가리킨다. 학명은 Fragaria × ananassa.

화석상으로 제일 오래된 것은 동양에서는 중국 윈난성 북서부의 허칭 분지(좌표: 26°31′N, 100°09′E)의 플라이오세 초기 시절 지층에서 발견된 것이며, 영어 논문 서양에서는 폴란드의 중신세 지층에서 발견된 것이 제일 오래된 것이라고 한다. `,
      '논산'
    ),
  ];

  return (
    <div>
      {fruits.map((fruit, index) => (
        <FruitItem key={index} fruit={fruit} />
      ))}
    </div>
  );
}
