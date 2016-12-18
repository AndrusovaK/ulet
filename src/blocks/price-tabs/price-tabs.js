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
						['1 цвет, 1 сторона', '33', '25','17,9','15,1','12,3','9,9','7,9','5,8','5,4','5','4,4','3,6'],
						['1 цвет, 2 стороны', '36', '28','23,3','17,9','14,6','11,3','9,6','7,5','7,3','6,9','6','5,7'],
						['2 цвета, 1 сторона', '41', '32','25','23','21,1','19,8','15,6','12,3','9,9','8,4','7,8','6,9'],
						['2 цвета, 2 стороны', '45', '36','28,7','26,6','24,8','23,1','16,7','14','12','9,8','8,8','8,5']
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

					var table = $('<table class="table"></table>'),
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

			var activeTab = $('.price-tabs__tab--active').attr('data-tab');

			priceTable.create(activeTab, priceTablesData);


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
			});

		}


	});
}());
