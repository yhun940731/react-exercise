import { Container } from 'containers'
import { A11yHidden } from 'components'

export default function DemoPage() {

  return(
    <div className="demo-page">
      <A11yHidden as="h2">Demonstration</A11yHidden>
      <Container max={1280}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus accusamus beatae tempora deserunt nihil necessitatibus, ab corporis consectetur sed officia quam illum eos, explicabo quod at optio eum quaerat maiores!
        </p>
      </Container>
      <p>
        Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Толку живет бросил свою свой заманивший моей которое собрал предупредила даже. Она собрал, жизни парадигматическая но маленький вопроса вопрос снова?
      </p>
    </div>
  )
}