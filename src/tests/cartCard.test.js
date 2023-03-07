import { render, screen } from "@testing-library/react"
import CartCard from "../components/Cart/CartCard"
import userEvent from "@testing-library/user-event"

const product = {
    id: "1",
    image: "https://picsum.photos/id/237/200/300",
    title: "Produto teste",
    price: 1000
}

const removeToCartMock = jest.fn()

describe("Cart Card", () => {
    test("testando", async () => {
        const user = userEvent.setup()

        render(<CartCard product={product} removeFromCart={removeToCartMock}/>)

        const title = screen.getByRole('heading', { name: /produto teste/i })
        const image = screen.getByRole('img', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const removeBtn = screen.getByRole('button', { name: /remove/i })

        await user.click(removeBtn)

        expect(removeToCartMock).toBeCalled()
        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
    })
})