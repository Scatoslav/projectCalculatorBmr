export function printToPdf(element, title = 'Отчет') {
    if (!element || !element.innerHTML.trim()) {
        alert('Нет данных для печати!');
        return;
    }
    
    
    const clone = element.cloneNode(true);
    
    // Открываем окно для печати
    const win = window.open('', '_blank');
    
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: white;
                }
                .report {
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #667eea;
                    text-align: center;
                }
                hr {
                    margin: 20px 0;
                    border: none;
                    height: 2px;
                    background: #667eea;
                }
                .result-block {
                    background: #f5f7fa;
                    padding: 15px;
                    border-radius: 10px;
                }
                .menu-block {
                    margin-top: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                }
                ul {
                    list-style: none;
                    padding-left: 0;
                }
                li {
                    padding: 5px 0;
                }
                button {
                    display: none;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="report">
                <h1>📊 ${title}</h1>
                <p style="text-align: center; color: #666;">Дата: ${new Date().toLocaleDateString()}</p>
                <hr>
                <div class="result-block">
                    ${clone.outerHTML}
                </div>
                <hr>
                <p style="text-align: center; font-size: 12px; color: #999;">
                    Сгенерировано в Калькуляторе калорий
                </p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 500);
                };
            <\/script>
        </body>
        </html>
    `);
    
    win.document.close();
}