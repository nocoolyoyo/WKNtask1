(function ($) {
    /**
     * Simplified Chinese language package
     * Translated by @shamiao
     */
    $.fn.bootstrapValidator.i18n = $.extend(true, $.fn.bootstrapValidator.i18n, {
        base64: {
            'default': '请输入有效的Base64编码'
        },
        between: {
            'default': '请输入在 %s �? %s 之间的数�?',
            notInclusive: '请输入在 %s �? %s 之间(不含两端)的数�?'
        },
        callback: {
            'default': '请输入有效的�?'
        },
        choice: {
            'default': '请输入有效的�?',
            less: '请至少��中 %s 个��项',
            more: '朢�多只能��中 %s 个��项',
            between: '请��择 %s �? %s 个��项'
        },
        color: {
            'default': '请输入有效的颜色�?'
        },
        creditCard: {
            'default': '请输入有效的信用卡号�?'
        },
        cusip: {
            'default': '请输入有效的美国CUSIP代码'
        },
        cvv: {
            'default': '请输入有效的CVV代码'
        },
        date: {
            'default': '请输入有效的日期',
            min: '请输�? %s 或之后的日期',
            max: '请输�? %s 或以前的日期',
            range: '请输�? %s �? %s 之间的日�?'
        },
        different: {
            'default': '请输入不同的�?'
        },
        digits: {
            'default': '请输入有效的数字'
        },
        ean: {
            'default': '请输入有效的EAN商品编码'
        },
        emailAddress: {
            'default': '请输入有效的邮件地址'
        },
        file: {
            'default': '请��择有效的文�?'
        },
        greaterThan: {
            'default': '请输入大于等�? %s 的数�?',
            notInclusive: '请输入大�? %s 的数�?'
        },
        grid: {
            'default': '请输入有效的GRId编码'
        },
        hex: {
            'default': '请输入有效的16进制�?'
        },
        hexColor: {
            'default': '请输入有效的16进制颜色�?'
        },
        iban: {
            'default': '请输入有效的IBAN(国际银行账户)号码',
            countryNotSupported: '不支�? %s 国家或地�?',
            country: '请输入有效的 %s 国家或地区的IBAN(国际银行账户)号码',
            countries: {
                AD: '安道​��尔',
                AE: '阿联�?',
                AL: '阿尔巴尼�?',
                AO: '安哥�?',
                AT: '奥地�?',
                AZ: '阿塞拜疆',
                BA: '波斯尼亚和黑塞哥维那',
                BE: '比利�?',
                BF: '布基纳法�?',
                BG: '保加利亚',
                BH: '巴林',
                BI: '布隆�?',
                BJ: '贝宁',
                BR: '巴西',
                CH: '瑞士',
                CI: '科特迪瓦',
                CM: '喢�麦隆',
                CR: '哥斯达黎� ',
                CV: '佛得�?',
                CY: '塞浦路斯',
                CZ: '捷克共和�?',
                DE: '德国',
                DK: '丹麦',
                DO: '多米尼加共和�?',
                DZ: '阿尔及利�?',
                EE: '爱沙尼亚',
                ES: '西班�?',
                FI: '芬兰',
                FO: '法罗群岛',
                FR: '法国',
                GB: '英国',
                GE: '格鲁吉亚',
                GI: '直布罗陀',
                GL: '格陵兰岛',
                GR: '希腊',
                GT: '危地马拉',
                HR: '克罗地亚',
                HU: '匈牙�?',
                IE: '爱尔�?',
                IL: '以色�?',
                IR: '伊朗',
                IS: '冰岛',
                IT: '意大�?',
                JO: '约旦',
                KW: '科威�?',
                KZ: '哈萨克斯�?',
                LB: '黎巴�?',
                LI: '列支敦士�?',
                LT: '立陶�?',
                LU: '卢森�?',
                LV: '拉脱维亚',
                MC: '摩纳�?',
                MD: '摩尔多瓦',
                ME: '黑山',
                MG: '马达加斯� ',
                MK: '马其�?',
                ML: '马里',
                MR: '毛里塔尼�?',
                MT: '马��他',
                MU: '毛里求斯',
                MZ: '莫桑比克',
                NL: '荷兰',
                NO: '挪威',
                PK: '巴基斯坦',
                PL: '波兰',
                PS: '巴勒斯坦',
                PT: '葡萄�?',
                QA: '卡塔�?',
                RO: '罗马尼亚',
                RS: '塞尔维亚',
                SA: '沙特阿拉�?',
                SE: '瑞典',
                SI: '斯洛文尼�?',
                SK: '斯洛伐克',
                SM: '圣马力诺',
                SN: '塞内加尔',
                TN: '突尼�?',
                TR: '土��其',
                VG: '英属维尔京群�?'
            }
        },
        id: {
            'default': '请输入有效的身份证件号码',
            countryNotSupported: '不支�? %s 国家或地�?',
            country: '请输入有效的 %s 国家或地区的身份证件号码',
            countries: {
                BA: '波黑',
                BG: '保加利亚',
                BR: '巴西',
                CH: '瑞士',
                CL: '智利',
                CN: '中国',
                CZ: '捷克共和�?',
                DK: '丹麦',
                EE: '爱沙尼亚',
                ES: '西班�?',
                FI: '芬兰',
                HR: '克罗地亚',
                IE: '爱尔�?',
                IS: '冰岛',
                LT: '立陶�?',
                LV: '拉脱维亚',
                ME: '黑山',
                MK: '马其�?',
                NL: '荷兰',
                RO: '罗马尼亚',
                RS: '塞尔维亚',
                SE: '瑞典',
                SI: '斯洛文尼�?',
                SK: '斯洛伐克',
                SM: '圣马力诺',
                TH: '泰国',
                ZA: '南非'
            }
        },
        identical: {
            'default': '请输入相同的�?'
        },
        imei: {
            'default': '请输入有效的IMEI(手机串号)'
        },
        imo: {
            'default': '请输入有效的国际海事组织(IMO)号码'
        },
        integer: {
            'default': '请输入有效的整数�?'
        },
        ip: {
            'default': '请输入有效的IP地址',
            ipv4: '请输入有效的IPv4地址',
            ipv6: '请输入有效的IPv6地址'
        },
        isbn: {
            'default': '请输入有效的ISBN(国际标准书号)'
        },
        isin: {
            'default': '请输入有效的ISIN(国际证券编码)'
        },
        ismn: {
            'default': '请输入有效的ISMN(印刷音乐作品编码)'
        },
        issn: {
            'default': '请输入有效的ISSN(国际标准杂志书号)'
        },
        lessThan: {
            'default': '请输入小于等�? %s 的数�?',
            notInclusive: '请输入小�? %s 的数�?'
        },
        mac: {
            'default': '请输入有效的MAC物理地址'
        },
        meid: {
            'default': '请输入有效的MEID(移动设备识别�?)'
        },
        notEmpty: {
            'default': '请填写必填项�?'
        },
        numeric: {
            'default': '请输入有效的数��，允许小数'
        },
        phone: {
            'default': '请输入有效的电话号码',
            countryNotSupported: '不支�? %s 国家或地�?',
            country: '请输入有效的 %s 国家或地区的电话号码',
            countries: {
                BR: '巴西',
                CN: '中国',
                CZ: '捷克共和�?',
                DE: '德国',
                DK: '丹麦',
                ES: '西班�?',
                FR: '法国',
                GB: '英国',
                MA: '摩洛�?',
                PK: '巴基斯坦',
                RO: '罗马尼亚',
                RU: '俄罗�?',
                SK: '斯洛伐克',
                TH: '泰国',
                US: '美国',
                VE: '委内瑞拉'
            }
        },
        regexp: {
            'default': '请输入符合正则表达式限制的��?'
        },
        remote: {
            'default': '请输入有效的�?'
        },
        rtn: {
            'default': '请输入有效的RTN号码'
        },
        sedol: {
            'default': '请输入有效的SEDOL代码'
        },
        siren: {
            'default': '请输入有效的SIREN号码'
        },
        siret: {
            'default': '请输入有效的SIRET号码'
        },
        step: {
            'default': '请输入在基础值上，增�  %s 的整数��的数��?'
        },
        stringCase: {
            'default': '只能输入小写字母',
            upper: '只能输入大写字母'
        },
        stringLength: {
            'default': '请输入符合长度限制的�?',
            less: '朢�多只能输�? %s 个字�?',
            more: '霢�要输入至�? %s 个字�?',
            between: '请输�? %s �? %s 个字�?'
        },
        uri: {
            'default': '请输入一个有效的URL地址'
        },
        uuid: {
            'default': '请输入有效的UUID',
            version: '请输入版�? %s 的UUID'
        },
        vat: {
            'default': '请输入有效的VAT(税号)',
            countryNotSupported: '不支�? %s 国家或地�?',
            country: '请输入有效的 %s 国家或地区的VAT(税号)',
            countries: {
                AT: '奥地�?',
                BE: '比利�?',
                BG: '保加利亚',
                BR: '巴西',
                CH: '瑞士',
                CY: '塞浦路斯',
                CZ: '捷克共和�?',
                DE: '德国',
                DK: '丹麦',
                EE: '爱沙尼亚',
                ES: '西班�?',
                FI: '芬兰',
                FR: '法语',
                GB: '英国',
                GR: '希腊',
                EL: '希腊',
                HU: '匈牙�?',
                HR: '克罗地亚',
                IE: '爱尔�?',
                IS: '冰岛',
                IT: '意大�?',
                LT: '立陶�?',
                LU: '卢森�?',
                LV: '拉脱维亚',
                MT: '马��他',
                NL: '荷兰',
                NO: '挪威',
                PL: '波兰',
                PT: '葡萄�?',
                RO: '罗马尼亚',
                RU: '俄罗�?',
                RS: '塞尔维亚',
                SE: '瑞典',
                SI: '斯洛文尼�?',
                SK: '斯洛伐克',
                VE: '委内瑞拉',
                ZA: '南非'
            }
        },
        vin: {
            'default': '请输入有效的VIN(美国车辆识别号码)'
        },
        zipCode: {
            'default': '请输入有效的邮政编码',
            countryNotSupported: '不支�? %s 国家或地�?',
            country: '请输入有效的 %s 国家或地区的邮政编码',
            countries: {
                AT: '奥地�?',
                BR: '巴西',
                CA: '加拿�?',
                CH: '瑞士',
                CZ: '捷克共和�?',
                DE: '德国',
                DK: '丹麦',
                FR: '法国',
                GB: '英国',
                IE: '爱尔�?',
                IT: '意大�?',
                MA: '摩洛�?',
                NL: '荷兰',
                PT: '葡萄�?',
                RO: '罗马尼亚',
                RU: '俄罗�?',
                SE: '瑞典',
                SG: '新加�?',
                SK: '斯洛伐克',
                US: '美国'
            }
        }
    });
}(window.jQuery));
