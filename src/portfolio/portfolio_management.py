# Import important libraries and modules
from classes.portfolio import Portfolio

def main():
    portfolio = Portfolio()

    while True:
        print("\nPortfolio Management Menu:")
        print("1. Add Asset")
        print("2. Set Investment Horizon")
        print("3. Display Portfolio")
        print("4. Run Monte Carlo Simulations")
        print("5. Visualize Simulations")
        print("6. Exit")
        
        choice = input("Enter your choice: ")
        
        if choice == "1":
            asset_name = input("Enter asset name (e.g., AAPL): ")
            weight = float(input("Enter asset weight (as a fraction, e.g., 0.2 for 20%): "))
            portfolio.add_asset(asset_name, weight)
        elif choice == "2":
            days = int(input("Enter investment horizon in days (e.g., 252 for one trading year): "))
            portfolio.set_investment_horizon(days)
        elif choice == "3":
            portfolio.display()
        elif choice == "4":
            num_simulations = int(input("Enter number of simulations (e.g., 10000): "))
            portfolio.monte_carlo_simulation(num_simulations)
        elif choice == "5":
            if not portfolio.simulated_paths:
                portfolio.visualize_simulation()
            else:
                portfolio.visualize_simulation()
        elif choice == "6":
            break
        else:
            print("Invalid choice. Please choose again.")

if __name__ == "__main__":
    main()