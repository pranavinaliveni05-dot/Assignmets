import java.util.Scanner;

interface CartOperations {
    void addItem();
    void removeItem();
    void displayCount();
}

public class ShoppingCartClosure {

    public static CartOperations createCart() {
        final int[] count = {0}; // private state

        return new CartOperations() {
            public void addItem() {
                count[0]++;
                System.out.println("Item added.");
            }

            public void removeItem() {
                if (count[0] > 0) {
                    count[0]--;
                    System.out.println("Item removed.");
                } else {
                    System.out.println("Cart is already empty.");
                }
            }

            public void displayCount() {
                System.out.println("Current items in cart: " + count[0]);
            }
        };
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        CartOperations cart = createCart();

        while (true) {
            System.out.println("\n1. Add Item");
            System.out.println("2. Remove Item");
            System.out.println("3. Display Cart Count");
            System.out.println("4. Exit");
            System.out.print("Enter choice: ");

            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    cart.addItem();
                    break;
                case 2:
                    cart.removeItem();
                    break;
                case 3:
                    cart.displayCount();
                    break;
                case 4:
                    System.out.println("Exiting...");
                    sc.close();
                    return;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}