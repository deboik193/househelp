module.exports = {
    welcomeEmail: function (text, EmailToConfirm, btn) {
        return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>House Help</title>
    <style>
        .background-container {
            background-color: #5066e1;  padding: 150px
        }
        .content-container {
            background-color: #fff;  padding: 40px; border-radius: 8px
        }
        .text-doc {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            text-align: center;
            vertical-align: top;
            margin: 0;
            padding: 0 0 10px;
        }

        .text-color {
            color: #5066e1;
            font-size: 24px;
            font-weight: 700;
        }

        .text-weight {
            font-weight: normal;
            font-size: 14px
        }

        @media (max-width: 1200px) {
            .text-weight {
                font-weight: normal;
                font-size: 12px
            }

            .btn-font {
                box-sizing: border-box;
                font-size: 14px;
                color: #FFF;
                text-decoration: none;
                line-height: 2em;
                font-weight: bold;
                cursor: pointer;
                display: block;
                border-radius: 5px;
                text-transform: capitalize;
                background-color: #5066e1;
                border-color: #5066e1;
                border-style: solid;
                border-width: 10px 20px
            }

            .btn-font {
                box-sizing: border-box;
                font-size: 14px;
                color: #FFF;
                text-decoration: none;
                line-height: 1.2em;
                font-weight: bold;
                cursor: pointer;
                display: block;
                border-radius: 5px;
                text-transform: capitalize;
                background-color: #5066e1;
                border-color: #5066e1;
                border-style: solid;
                border-width: 10px 10px
            }
        }
         @media (max-width: 900px) {
            .background-container {
                padding: 50px
            }
            .content-container {
                padding: 15px;
            }
            .text-color {
                font-size: 18px;
            }
        }
    </style>
</head>

<body>
    <div class="background-container">
        <div class="content-container">
            <p class="smaller-text text-doc text-color">Welcome To househelp.com.ng
            <p class="text-doc text-weight">${text}
            </p>
            <p class="text-doc text-weight">We may need to send you critical information about our service and it is
                important that we have an accurate email address.
            </p>
            <a href="${EmailToConfirm}" class="text-doc btn-font">${btn}</a>

        </div>
    </div>
</body>

</html>
`
    }
}