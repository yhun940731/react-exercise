import { useState } from 'react'
import { PokemonForm } from 'api/pokemon'

/* -------------------------------------------------------------------------- */

function PokemonInfo({ pokemonName }) {
  // pokemon 상태 설정 (null)
  //

  // pokemonName이 변경 될 때마다 콜백 함수가 호출 되도록 React.useEffect() 훅을 사용합니다.
  //
  // pokemonName이 빈 문자열인 경우, 네트워크 요청을 수행하지 않습니다.
  // fetchPokemon을 사용해 네트워크 요청하기 전에 현재 pokemon 상태를 null로 설정합니다.
  // 사용 예시)
  // fetchPokemon('Pikachu').then(
  //   pokemonData => { /* 상태 업데이트 */},
  // )
  //
  // `pokemon` 상태, `pokemonName` 속성에 따라 다음 결과를 반환합니다.
  //   1. `pokemonName`이 없을 경우                   → '포켓몬 이름을 입력하세요.'
  //   2. `pokemonName`은 있지만, `pokemon`이 없을 경우 → <PokemonInfoFallback name={pokemonName} />
  //   3. `pokemon`이 존재할 경우                     → <PokemonDataView pokemon={pokemon} />

  // 아래 주석을 제거하세요.
  return '`피카츄` 실습을 진행하세요!'
}

/* -------------------------------------------------------------------------- */

export default function Pokemon() {
  const [pokemonName, setPokemonName] = useState('pikachu')
  const handleSubmit = (newPokemonName) => setPokemonName(newPokemonName)

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}
