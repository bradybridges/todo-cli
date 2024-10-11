# TODO CLI

A command line tool to manage a simple todo list.

### Installation
***This package should be installed globally.***
```
npm install -g @bradyjbridges/todo-cli
```

## Usage

### TUI Usage

Easily add, update, and delete tasks using a simple interface.

```
todo
```
![Screenshot 2024-10-04 at 9 37 50 PM](https://github.com/user-attachments/assets/df80e305-04ef-4369-b633-00dfb0cd8b2e)


### CLI Usage

####  Add a new task

```
todo add "New task"
```
![Screenshot 2024-10-04 at 9 47 09 PM](https://github.com/user-attachments/assets/7e29b625-5fc2-43b1-8e5f-a4fa6e41d7fc)


#### List tasks

```
todo list
```
![Screenshot 2024-10-04 at 9 38 10 PM](https://github.com/user-attachments/assets/388b8fa6-adc6-4f10-956c-3c5266ef29b1)


#### Delete all tasks

```
todo delete-all
```
![Screenshot 2024-10-04 at 9 39 43 PM](https://github.com/user-attachments/assets/178a8e7c-c3e8-4958-adec-7bdc8a61f05f)


####  Delete completed tasks

```
todo delete-completed
```
![Screenshot 2024-10-04 at 9 40 10 PM](https://github.com/user-attachments/assets/2407cbd0-dd6d-4c64-be04-6936f0543da7)


#### Delete specific tasks

```
todo delete -t <taskID taskID taskID>
todo delete -t 1 3 5
```
![Screenshot 2024-10-04 at 9 44 19 PM](https://github.com/user-attachments/assets/cb4df404-dc53-41bb-8d64-914dec254b49)


#### Mark tasks as complete

```
todo mark-complete -t <taskID taskID taskID>
todo mark-complete -t 1 3 5
```
![Screenshot 2024-10-04 at 9 45 14 PM](https://github.com/user-attachments/assets/f091f57f-50b6-467c-a875-c716db3449f0)


#### Marks tasks as incomplete

```
todo mark-incomplete -t <taskID taskID taskID>
todo mark-incomplete -t 1 3 5
```
![Screenshot 2024-10-04 at 9 45 34 PM](https://github.com/user-attachments/assets/0b1be284-7bb5-4f14-af79-95623b668b00)


#### Manage settings

##### Allows customization of

Application title displayed in task list header

![Screenshot 2024-10-04 at 9 49 11 PM](https://github.com/user-attachments/assets/66b71f0c-dbe6-4585-9354-b82c7bc58c54)

Message displayed when there are no tasks

![Screenshot 2024-10-04 at 9 49 33 PM](https://github.com/user-attachments/assets/be8f0f20-1f70-4d28-9db0-74eae1f3b191)

Enable/disable TUI exit message

Message displayed when exiting TUI

![Screenshot 2024-10-04 at 9 49 47 PM](https://github.com/user-attachments/assets/f8f289f5-560c-467c-bd17-0a2e3026c972)

```
todo settings
```
![Screenshot 2024-10-04 at 9 57 14 PM](https://github.com/user-attachments/assets/c19e6716-8dc3-429b-a70e-c0412a2ecebb)


#### Help

```
todo --help
```
![Screenshot 2024-10-04 at 9 39 26 PM](https://github.com/user-attachments/assets/eac6664e-200e-4b6c-9dbb-d41db0bec343)


#### Command help

```
todo help [command]
todo help add
```

#### Check version

```
todo --version
```
