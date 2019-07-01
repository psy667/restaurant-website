### Меню
#### Получение списка блюд  
Access: Public  
Method: GET  
URL: `/api/meals`

#### Добавление
Access: Private  
Method: POST  
URL: `/api/meals`

Params:
- name
- description

#### Удаление
Access: Private  
Method: DELETE  
URL: `/api/meals/:id`

#### Редактирование
Access: Private  
Method: PATCH  
URL: `/api/meals/:id`

Params:
- name
- description

### Резервирование
#### Добавление
Access: Public  
Method: POST  
URL: `/api/reserves`

Params:
- name
- day
- count_of_guests
- tel
- email

#### Получение списка резервов
Access: Private  
Method: GET  
URL: `/api/reserves`

### Вход
Access: Public  
Method: POST  
URL: `/api/auth`

Params:
- email
- password
