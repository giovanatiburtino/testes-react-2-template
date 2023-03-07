import { render, screen } from "@testing-library/react"
import ProductCard from "../components/ProductsList/ProductCard"
import userEvent from "@testing-library/user-event"

const product = {
    id: "1",
    image: "https://picsum.photos/id/237/200/300",
    title: "Produto teste",
    price: 1000
}

const addToCartMock = jest.fn()

describe("Product Card", () => {
    test("testar renderizar card de produto", () => {
        render(<ProductCard product={product} addToCart={addToCartMock}/>)


        const title = screen.getByText("Produto teste")
        expect(title).toBeInTheDocument()
    })

    test("testar a renderização do título, imagem, preço e botão de compra", () => {
        render(<ProductCard product={product} addToCart={addToCartMock}/>)

        const title = screen.getByRole('heading', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const image = screen.getByRole('img', {name: /produto teste/i})
        const addBtn = screen.getByRole('button', { name: /buy/i })

        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
    })


    test("testa quando o produto de compra for clicado chama a função", async () => {
        const user = userEvent.setup()

        render(<ProductCard product={product} addToCart={addToCartMock}/>)

        const addBtn = screen.getByRole('button', {name: /buy/i })

        await user.click(addBtn)

        expect(addToCartMock).toBeCalled()

        expect(addToCartMock).toBeCalledTimes(1)

        expect(addToCartMock).toBeCalledWith(product)
    })


    test("testar quando o produto de compra for clicado chama a função de adicionar ao carrinho", async () => {
        const user = userEvent.setup()

        render(<ProductCard product={product} addToCart={addToCartMock}/>)

        const addBtn = screen.getByRole('button', {name: /buy/i })

        await user.click(addBtn)

        expect(addToCartMock).toBeCalledTimes(1)
    })
})
