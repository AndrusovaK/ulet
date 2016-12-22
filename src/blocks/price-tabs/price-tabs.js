(function(){
	$(function () {

		var tabLink = $('.price-tabs__tab');

		if(tabLink) {

			var priceTablesData = {
				latecs28sm: {
					title: '12 дюймовые (28см) латексные шарики',
					rows: 4,
					columns: [
						{name: 'Тип печати/тираж'},
						{name: '30'},
						{name: '51'},
						{name: '101'},
						{name: '201'},
						{name: '301'},
						{name: '401'},
						{name: '501'},
						{name: '1001'},
						{name: '2001'},
						{name: '3001'},
						{name: '5001'},
						{name: '10001'}
					],
					data: [
						['1 цвет, 1 сторона', '33', '25','17.9','15.1','12.3','9.9','7.9','5.8','5.4','5','4.4','3.6'],
						['1 цвет, 2 стороны', '36', '28','23.3','17.9','14.6','11.3','9.6','7.5','7.3','6.9','6','5.7'],
						['2 цвета, 1 сторона', '41', '32','25','23','21.1','19.8','15.6','12.3','9.9','8.4','7.8','6.9'],
						['2 цвета, 2 стороны', '45', '36','28.7','26.6','24.8','23.1','16.7','14','12','9.8','8.8','8.5']
					]
				}
			};

			var priceTable = {
				activeTabId: '',
				activeTabContent: '',
				create: function (tabId, tabsData) {
					var that = this;

					that.activeTabId = tabId;
					that.activeTabContent = $("#" + tabId);

					$(that.activeTabContent).find('.price-tabs__price-table').empty();

					var table = $('<table class="table" id="price-table"></table>'),
							thead = $('<thead></thead>'),
							tbody = $('<tbody></tbody>');

					$(thead).append('<tr class="table__title"><th colspan="13">'+ tabsData[tabId].title +'</th></tr>');

					// Создаем строку для названий ячеек
					var titlesRow = $('<tr class="table__cols-titles"></tr>');

					// добавляем в нее ячейки с названиями
					$.each(tabsData[tabId].columns, function (index, value) {
						$(titlesRow).append('<th>'+ value.name +'</th>');
					});

					$(thead).append(titlesRow);


					// создаем и наполняем строки таблицы
					for (var i = 0; i < tabsData[tabId].rows; i++) {
						var row = $('<tr></tr>');

						var rowData = tabsData[tabId].data[i];

						for (var j = 0; j < rowData.length; j++) {
							var td = $('<td></td>');
							if(j === 0){
								td.text(rowData[j]);
							} else {
								td.text(rowData[j] + 'р.');
							}
							$(row).append(td);
						}

						$(tbody).append(row);
					}

					$(table).append(thead);
					$(table).append(tbody);
					$(that.activeTabContent).find('.price-tabs__price-table').append(table);
				}
			};



			/* CALCULATOR */

			var printCalculator = {
				addedOptions: [],
				addOption: function (event) {
					var optionType = $(this).closest('tr').find('td:first-child').html();
					var columnIndex = parseInt($(event.currentTarget).index());
					var numberOfBalloons = $($(this).closest('table').find('.table__cols-titles th')[columnIndex]).html();
					var price = parseFloat($(this).html());

					// Если выбранная опция уже присутствует калькуляторе, то обновляем значения
					// иначе - создаем строку
					if($.inArray(optionType, printCalculator.addedOptions) > -1) {
						var sameOptionTr = null;
						$('#calculator tr').each(function (index, elem) {
							if($(elem).find('td:first-child').html() === optionType) {
								sameOptionTr = elem;
							}
						});

						$(sameOptionTr).find('input').val(numberOfBalloons);
						$(sameOptionTr).find('.calc__option-price').text(price +'р.');
						$(sameOptionTr).find('.calc__option-sum').text(printCalculator.culcOption(numberOfBalloons, price) +'р.');
					} else {
						printCalculator.addedOptions.push(optionType);

						var row = $('<tr>' +
								'<td>'+ optionType +'</td>' +
								'<td class="calc__option-number">' +
									'<label class="number">' +
										'<input type="text" value="' + numberOfBalloons +'"' + ' class="number__input">' +
										'<span class="number__minus">-</span>' +
										'<span class="number__plus">+</span>' +
									'</label>' +
								'</td>' +
								'<td class="calc__option-price">'+ price +'р.</td>' +
								'<td class="calc__option-sum">'+ printCalculator.culcOption(numberOfBalloons, price) +'р.</td>' +
								'<td class="table__delete-option">X</td>' +
								'</tr>');
						$('#calculator tbody').append(row);
					}

					printCalculator.culcAllOptions();
				},

				culcOption: function (amount, price) {
					return (Number(amount)*Number(price)).toFixed(1);
				},

				culcAllOptions: function () {
					var sum = 0;
					$('#calculator .calc__option-sum').each(function (index, elem) {
						sum += parseFloat($(elem).html());
					});

					$('#total-price').text(sum.toFixed(1) + 'р.');
				},

				deleteOption: function () {
					var tr = $(this).closest('tr');
					var optionIndex = $.inArray(tr.find('td:first-child').html(), printCalculator.addedOptions);
					tr.remove();
					if(optionIndex > -1) {
						printCalculator.addedOptions.splice(optionIndex, 1);
					}
					console.log(printCalculator.addedOptions);
					printCalculator.culcAllOptions();
				}
			};

			/* CHANGE BALLOONS NUMBER HANDLER */
			function changeNumberOfBalloons() {
				var numberOfBalloons = Number($(this).val());
				var currentTr = $(this).closest('tr');
				var optionType = currentTr.find('td:first-child').html();
				var currentTabPriceData = priceTablesData[priceTable.activeTabId];
				var priceIndex;
				var price;

				for (var i = 1; i < currentTabPriceData.columns.length; i++) {
					if ((numberOfBalloons >= Number(currentTabPriceData.columns[i].name) && i !== currentTabPriceData.columns.length - 1 && numberOfBalloons < Number(currentTabPriceData.columns[i+1].name)) ||
							(numberOfBalloons >= Number(currentTabPriceData.columns[i].name) && i === currentTabPriceData.columns.length - 1)){
						priceIndex = i;
						break;
					}
				}

				currentTabPriceData.data.forEach(function (elem) {
					if ($.inArray(optionType, elem) > -1) {
						price = elem[priceIndex];
					}
				});

				$(currentTr).find('.calc__option-price').text(price +'р.');
				$(currentTr).find('.calc__option-sum').text(printCalculator.culcOption(numberOfBalloons, price) +'р.');
				printCalculator.culcAllOptions();
			}


			function addListeners () {
				$('#price-table td:nth-child(n+2)').on('click', printCalculator.addOption);
				$(document).on('click', '#calculator .table__delete-option', printCalculator.deleteOption);
				$(document).on('change', '#calculator .number__input', changeNumberOfBalloons);
				$(document).on('click', '#calculator .number__minus', function () {
					var $input = $(this).parent().find('input');
					var count = parseInt($input.val()) - 1;
					count = count < 30 ? 30 : count;
					$input.val(count);
					$input.change();
					return false;
				});

				$(document).on('click', '#calculator .number__plus', function () {
					var $input = $(this).parent().find('input');
					$input.val(parseInt($input.val()) + 1);
					$input.change();
					return false;
				});
			}

			/* Наполняем таблицу цен таба при открытии страницы */
			var activeTab = $('.price-tabs__tab--active').attr('data-tab');
			if(activeTab) {
				priceTable.create(activeTab, priceTablesData);
				addListeners();
			}

			/* Init tabs*/
			$(tabLink).click(function () {
				var tabId = $(this).attr('data-tab');
				var tabContent = $("#" + tabId);

				$(tabLink).removeClass('price-tabs__tab--active');
				$('.price-tabs__section').removeClass('current');

				$(this).addClass('price-tabs__tab--active');
				$(tabContent).addClass('current');

				/* create tables*/
				priceTable.create(tabId, priceTablesData);
				addListeners();
			});

		}
	});
}());
