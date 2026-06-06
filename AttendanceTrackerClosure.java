import java.util.Scanner;

interface AttendanceOperations {
    void markAttendance();
    void displayAttendance();
}

public class AttendanceTrackerClosure {

    public static AttendanceOperations createTracker() {
        final int[] attendanceCount = {0}; // private state

        return new AttendanceOperations() {
            public void markAttendance() {
                attendanceCount[0]++;
                System.out.println("Attendance marked.");
            }

            public void displayAttendance() {
                System.out.println("Total attended classes: " + attendanceCount[0]);
            }
        };
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        AttendanceOperations tracker = createTracker();

        while (true) {
            System.out.println("\n1. Mark Attendance");
            System.out.println("2. Display Attendance");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");

            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    tracker.markAttendance();
                    break;
                case 2:
                    tracker.displayAttendance();
                    break;
                case 3:
                    System.out.println("Exiting...");
                    sc.close();
                    return;
                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}