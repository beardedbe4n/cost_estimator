from main import CostEstimate

def main():
    # Create a new cost estimate
    estimate = CostEstimate("Web Development Project")

    # Add some sample rows
    row1 = estimate.add_row()
    row1.role = "Senior Developer"
    row1.people = 2
    row1.hours = 40
    row1.rate = 150
    row1.coefficient = 1.2

    row2 = estimate.add_row()
    row2.role = "UI Designer"
    row2.people = 1
    row2.hours = 20
    row2.rate = 100
    row2.coefficient = 1.0

    # Print the estimate as JSON
    print(estimate.to_json())

    # Export to CSV
    csv_file = estimate.export_to_csv()
    print(f"\nExported to: {csv_file}")

if __name__ == "__main__":
    main()