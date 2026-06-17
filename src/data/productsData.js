export const productsData = {
    bricks: {
        title: 'طوب أسمنتي',
        description: 'أجود أنواع الطوب الأسمنتى المصمت والمفرغ من مصنع القومية للصناعات الأسمنتية. ويصنف الطوب الأسمنتى حسب طرق استعماله إلى الأنواع التالية:\n\n١) الطوب المصمت: وهو الطوب الذي لا يحتوي على أي فراغات أو ثقوب مشكلة به صناعيا، وقد نصت المواصفات القياسية على أن الطوبة المصمتة تقل نسبة الفراغات الصناعية فيها عن ٢٥٪. ويصنف الطوب المصمت إلى:\n– طوب غير حامل (Non-load Bearing bricks): معد للاستعمال في الحوائط غير الحاملة.\n– طوب حامل (Load Bearing bricks): معد للاستعمال في الحوائط الحاملة.',
        items: [
            {
                id: 'solid-25',
                name: 'طوب أسمنتي مصمت مقاس 25',
                images: [
                    '/images/طوب اسمنيتي مصمط 25 1.png',
                    '/images/طوب اسمنتي مصمط.png',
                    '/images/IMG-20260113-WA0062.jpg',
                    '/images/IMG-20260113-WA0055.jpg',
                    '/images/IMG-20250627-WA0016.jpg'
                ],
                shortDescription: 'مطابق للمواصفة القياسية المصرية (ES 1292)، مثالي للحوائط الحاملة والمداميك الأولى.',
                specs: {
                    length: '25 سم',
                    width: '12 سم',
                    height: '6 سم',
                    weight: 'حوالي 3.5 - 3.8 كجم',
                    material: 'أسمنت بورتلاندي، رمل، سن',
                    strength: '140 - 175 كجم/سم²',
                    absorption: '4% - 7%',
                    usage: 'الحوائط الحاملة، أعمال البدرومات، حول الفتحات'
                }
            },
            {
                id: 'solid-20',
                name: 'طوب أسمنتي مصمت مقاس 20',
                image: '/images/طوب اسمنتي مصمط.png',
                shortDescription: 'مطابق للمواصفة القياسية المصرية (ES 1292)، مصمم للاستخدامات العامة والقواطع.',
                specs: {
                    length: '20 سم',
                    width: '10 سم',
                    height: '6 سم',
                    weight: 'حوالي 2.5 - 2.8 كجم',
                    material: 'أسمنت بورتلاندي، رمل، سن',
                    strength: 'يصل إلى 140 كجم/سم²',
                    absorption: '4% - 7%',
                    usage: 'القواطع الداخلية، الجدران غير الحاملة'
                }
            }
        ]
    },
    interlock: {
        title: 'إنترلوك',
        description: 'بلاط الإنترلوك المتداخل هو نوع من أنواع البلاط الخرساني سابقة الصب، يتم تصنيعه بأشكال هندسية متنوعة ويتم تركيبه بطريقة التعشيق. يتميز بقوة تحمل عالية ومقاومة للاحتكاك، مما يجعله مثالياً لممرات المشاة، محطات الوقود، القرى السياحية، ومواقف السيارات.',
        items: [
            {
                id: 'interlock-hex',
                name: 'إنترلوك سداسي',
                image: '/images/factory-logo.png',
                shortDescription: 'إنترلوك سداسي الشكل متوفر بارتفاعات تناسب المشاة والسيارات.',
                specs: {
                    length: 'متغير حسب القالب',
                    width: 'متغير حسب القالب',
                    height: '6 سم / 8 سم',
                    weight: 'حسب الارتفاع',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '250 - 300 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'المشايات، الحدائق، مواقف السيارات (8 سم)'
                }
            },
            {
                id: 'interlock-parquet',
                name: 'إنترلوك باركيه (مستطيل)',
                image: '/images/factory-logo.png',
                shortDescription: 'تصميم كلاسيكي مستطيل يمكن تركيبه بعدة أشكال (رص، هيرنج بون).',
                specs: {
                    length: '20 سم',
                    width: '10 سم',
                    height: '6 سم / 8 سم',
                    weight: 'حسب الارتفاع',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '250 - 300 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'الأرصفة، الساحات العامة، المحطات'
                }
            },
            {
                id: 'interlock-honeycomb',
                name: 'إنترلوك عش النحل (شبك)',
                image: '/images/factory-logo.png',
                shortDescription: 'تصميم شبكي مميز يعطي مظهراً جمالياً رائعاً للساحات الكبيرة.',
                specs: {
                    length: 'متغير',
                    width: 'متغير',
                    height: '8 سم',
                    weight: 'حسب الارتفاع',
                    material: 'خرسانة عالية الإجهاد',
                    strength: 'يصل إلى 300 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'المناطق ذات الأحمال العالية، القرى السياحية'
                }
            },
            {
                id: 'interlock-hshape',
                name: 'إنترلوك إتش (H-Shape)',
                image: '/images/factory-logo.png',
                shortDescription: 'تصميم قوي جداً للتعشيق (حرف H) يمنع زحف البلاط تماماً.',
                specs: {
                    length: '20 سم',
                    width: '16 سم',
                    height: '6 سم / 8 سم',
                    weight: 'حسب الارتفاع',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '300 - 400 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'المصانع، الموانئ، محطات النقل الثقيل'
                }
            }
        ]
    },
    curbs: {
        title: 'بلدورة',
        description: 'البلدورة الخرسانية سابقة الصب تستخدم في تحديد الأرصفة، فصل الطرق، حماية المساحات الخضراء، وتوجيه مسارات المياه. تصنع من خرسانة عالية الكثافة وتتحمل العوامل الجوية والصدمات.',
        items: [
            {
                id: 'curb-garden',
                name: 'بلدورة جناين',
                image: '/images/factory-logo.png',
                shortDescription: 'بلدورة صغيرة الحجم مخصصة لتحديد أحواض الزهور والحدائق.',
                specs: {
                    length: '50 سم',
                    width: '8 سم',
                    height: '20 سم',
                    weight: '15 كجم',
                    material: 'خرسانة ملساء',
                    strength: '250 كجم/سم²',
                    absorption: 'أقل من 6%',
                    usage: 'الحدائق الخاصة، المشايات التجميلية'
                }
            },
            {
                id: 'curb-small',
                name: 'بلدورة صغيرة (رصيف)',
                image: '/images/factory-logo.png',
                shortDescription: 'بلدورة رصيف قياسية للمشروعات السكنية والشوارع الفرعية.',
                specs: {
                    length: '50 سم',
                    width: '10 سم / 12 سم',
                    height: '25 سم',
                    weight: '30 كجم',
                    material: 'خرسانة مسلحة اختياري',
                    strength: '250 كجم/سم²',
                    absorption: 'أقل من 6%',
                    usage: 'الأرصفة الجانبية، المجمعات السكنية'
                }
            },
            {
                id: 'curb-medium',
                name: 'بلدورة متوسطة',
                image: '/images/factory-logo.png',
                shortDescription: 'بلدورة متوسطة للطرق الرئيسية والمحاور.',
                specs: {
                    length: '50 سم',
                    width: '15 سم',
                    height: '30 سم',
                    weight: '50 كجم',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '300 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'الشوارع الرئيسية، الميادين'
                }
            },
            {
                id: 'curb-large',
                name: 'بلدورة كبيرة',
                image: '/images/factory-logo.png',
                shortDescription: 'بلدورة للطرق السريعة والكباري لحماية أعلى.',
                specs: {
                    length: '50 سم / 100 سم',
                    width: '20 سم',
                    height: '40 سم',
                    weight: '80 كجم',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '300 كجم/سم²',
                    absorption: 'أقل من 5%',
                    usage: 'الطرق السريعة، حماية الجزر الوسطى'
                }
            },
            {
                id: 'curb-jumbo',
                name: 'بلدورة عجالي (جامبو)',
                image: '/images/factory-logo.png',
                shortDescription: 'أكبر وأقوى أنواع البلدورات، مصممة لتحمل صدمات النقل الثقيل.',
                specs: {
                    length: '50 سم',
                    width: '30 سم',
                    height: '50 سم',
                    weight: '120 كجم',
                    material: 'خرسانة عالية الإجهاد',
                    strength: '400 كجم/سم²',
                    absorption: 'أقل من 4%',
                    usage: 'المصانع، الموانئ، محطات التحصيل'
                }
            }
        ]
    },
    blocks: {
        title: 'بلوك أسمنتي',
        description: 'البلوك الأسمنتي (الطوب البلوك) المفرغ والمصمت هو الخيار الأفضل والأسرع في البناء الحديث. يتميز بالعزل الحراري والصوتي الجيد في حالة البلوك المفرغ، والقوة العالية في البلوك المصمت.',
        items: [
            {
                id: 'block-40-20-20',
                name: 'بلوك أسمنتي 40×20×20',
                image: '/images/factory-logo.png',
                shortDescription: 'المقاس القياسي للبلوك الأسمنتي، يستخدم في بناء الحوائط الخارجية الرئيسية.',
                specs: {
                    length: '40 سم',
                    width: '20 سم',
                    height: '20 سم',
                    weight: 'متغير (مفرغ / مصمت)',
                    material: 'أسمنت، رمل، حصوة',
                    strength: '70 - 100 كجم/سم²',
                    absorption: 'حوالي 8%',
                    usage: 'الحوائط الخارجية، الأسوار العالية'
                }
            },
            {
                id: 'block-40-20-15',
                name: 'بلوك أسمنتي 40×20×15',
                image: '/images/factory-logo.png',
                shortDescription: 'بلوك متوسط العرض، مناسب للقواطع الداخلية والحوائط غير الحاملة.',
                specs: {
                    length: '40 سم',
                    width: '15 سم',
                    height: '20 سم',
                    weight: 'متغير (مفرغ / مصمت)',
                    material: 'أسمنت، رمل، حصوة',
                    strength: '70 - 100 كجم/سم²',
                    absorption: 'حوالي 8%',
                    usage: 'القواطع الداخلية، التقسيمات المعمارية'
                }
            },
            {
                id: 'block-40-20-12',
                name: 'بلوك أسمنتي 40×20×12',
                image: '/images/factory-logo.png',
                shortDescription: 'بلوك نحيف للقواطع الداخلية لتوفير مساحة البناء.',
                specs: {
                    length: '40 سم',
                    width: '12 سم',
                    height: '20 سم',
                    weight: 'متغير (مفرغ)',
                    material: 'أسمنت، رمل، حصوة',
                    strength: '70 كجم/سم²',
                    absorption: 'حوالي 8%',
                    usage: 'تقسيم الغرف، الحمامات والمطابخ'
                }
            }
        ]
    },
    tiles: {
        title: 'بلاط أسمنتي',
        description: 'البلاط الأسمنتي الكلاسيكي ذو التحمل العالي للبري والاحتكاك، مناسب للأرصفة والممرات والمناطق المفتوحة والمخازن.',
        items: [
            {
                id: 'tile-20-20',
                name: 'بلاط أسمنتي 20×20',
                image: '/images/factory-logo.png',
                shortDescription: 'بلاط أسمنتي قياسي، متوفر سادة أو بكسر رخام خفيف.',
                specs: {
                    length: '20 سم',
                    width: '20 سم',
                    height: '2 سم',
                    weight: '1 كجم',
                    material: 'أسمنت، بودرة رخام، كسر رخام',
                    strength: '250 كجم/سم²',
                    absorption: 'أقل من 6%',
                    usage: 'الأرصفة، الأسطح، غرف الماكينات'
                }
            },
            {
                id: 'tile-30-30',
                name: 'بلاط أسمنتي 30×30',
                image: '/images/factory-logo.png',
                shortDescription: 'بلاط مقاس كبير للساحات والممرات الواسعة، يتحمل الاستخدام الشاق.',
                specs: {
                    length: '30 سم',
                    width: '30 سم',
                    height: '3 سم',
                    weight: '2.5 كجم',
                    material: 'أسمنت، بودرة رخام، كسر رخام',
                    strength: '300 كجم/سم²',
                    absorption: 'أقل من 6%',
                    usage: 'الممرات التجارية، المدارس، المخازن'
                }
            }
        ]
    }
};
