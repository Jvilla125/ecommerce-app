import { render, screen, waitFor, } from "@testing-library/react"
import "@testing-library/jest-dom"
import HomePageComponent from "./HomePageComponent";
import { MemoryRouter as Router } from "react-router-dom"

let categories = [];
let getBestSellers = () => {
    return new Promise((resolve, reject) => {
        resolve([
            {
                _id: new ObjectId("64c2d2887afe9168ec5af7fc"),
                name: 'Product3 Dell Comp Name Lorem ipsum dolor sit amet',
                description: 'Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ipsa ducimus architecto explicabo id accusantium nihil exercitationem autem porro esse.',
                category: 'Computers/Laptops/Dell',
                images: [[Object], [Object], [Object]]
            }
        ])
    })
}

let getBestSellersError = () => {
    return new Promise((resolve, reject) => {
        reject({
            response: {
                data: {
                    message: "Producta is not defined",
                },
            },
        });
    });
};

test("if category is seen", async () => {
    render(
        <Router>
            <HomePageComponent
                categories={categories}
                getBestSellers={getBestSellers}
            />
        </Router>
    );
    await waitFor(() => screen.getByText(/Computers\/Laptops\/Lenovo/i));
    expect(screen.getByText(/Computers\/Laptops\/Lenovo/i)).toBeInTheDocument();
    //   expect(screen.getByRole("heading", { name: /Computers\/Laptops\/Lenovo/i }));
});

test("if error is seen", async () => {
    render(
        <Router>
            <HomePageComponent
                categories={categories}
                getBestSellers={getBestSellersError}
            />
        </Router>
    );

    await waitFor(() => screen.getByText(/Product is not defined/i));
    expect(screen.getByText(/Product is not defined/i)).toBeInTheDocument();
});