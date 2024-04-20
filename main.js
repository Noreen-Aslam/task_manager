// Importing the 'inquirer' library for command line prompts
import inquirer from "inquirer";
// Initializing an empty array to store tasks
const tasks = [];
let taskId = 1; // Initializing the task ID counter
// Main function to manage tasks
async function main() {
    // Infinite loop to keep the program running until the user chooses to exit
    while (true) {
        // Prompting the user to choose an option
        const { choice } = await inquirer.prompt({
            type: "list",
            name: "choice",
            message: "Choose an option:",
            choices: ["Add task", "View Task", "Complete Task", "Exit"],
        });
        // If user chooses to add a task
        if (choice === "Add task") {
            // Prompting the user to enter the task name
            const { taskName } = await inquirer.prompt({
                type: "input",
                name: "taskName",
                message: "Enter the task name:",
            });
            // Adding the task to the tasks array with a unique ID and setting completed status to false
            tasks.push({
                id: taskId++,
                name: taskName,
                completed: false
            });
            console.log("Task Added successfully!"); // Confirming task addition
        }
        // If user chooses to view tasks
        else if (choice === "View Task") {
            // Checking if there are any tasks in the array
            if (tasks.length === 0) {
                console.log("No task available."); // Informing user if no tasks available
            }
            else {
                // Displaying the current tasks with their IDs, statuses, and names
                console.log("Current Tasks:");
                tasks.forEach((task) => {
                    const status = task.completed ? "[Pending]" : "[Completed]";
                    console.log(`${task.id}. ${status} ${task.name}`);
                });
            }
        }
        // If user chooses to complete a task
        else if (choice === "Complete Task") {
            // Prompting the user to enter the ID of the task they want to complete
            const { taskIdToComplete } = await inquirer.prompt({
                type: "input",
                name: "taskIdToComplete",
                message: "Enter the ID of the task you want to complete:",
            });
            // Finding the task with the provided ID
            const taskToComplete = tasks.find(task => task.id === parseInt(taskIdToComplete));
            // If task with the provided ID is found
            if (taskToComplete) {
                // Marking the task as completed
                taskToComplete.completed = true;
                console.log("Task marked as completed successfully!");
            }
            else {
                console.log("Task with provided ID not found.");
            }
        }
        // If user chooses to exit the task manager
        else if (choice === "Exit") {
            console.log("Exiting task manager."); // Informing the user of exiting
            break; // Breaking out of the loop to exit the program
        }
    }
}
// Calling the main function to start the task manager
main();
