// exports.createPartyChecker = function (req) {
// 	try {
// 		if (req.name.trim().length === 0) {
// 			const response = {
// 				error: 'Empty spaces not allowed. Please check name and try again.'
// 			}
// 			return response;
// 		}
// 		if (req.hqaddress.trim().length === 0) {
// 			const response = {
// 				status: 400,
// 				error: 'Empty spaces not allowed. Please check hqaddress and try again.'
// 			}
// 			return response;
// 		}
// 		if (req.logourl.trim().length === 0) {
// 			const response = {
// 				status: 400,
// 				error: 'Empty spaces not allowed. Please check logourl and try again.'
// 			}
// 			return response;
// 		}
// 	} catch (error) {
// 		const response = {
// 			status: 500,
// 			error: error
// 		};
// 		return response;
// 	}
// }

// exports.editPartyChecker = function (req) {
// 	try {
// 		if (req.name.trim().length === 0) {
// 			const response = {
// 				error: 'Empty spaces not allowed. Please check name and try again.'
// 			}
// 			return response;
// 		}
// 	} catch (error) {
// 		const response = {
// 			status: 500,
// 			error: error
// 		};
// 		return response;
// 	}
// }

// exports.createOfficeChecker = function (req) {
// 	try {
// 		if (req.type.trim().length === 0) {
// 			const response = {
// 				error: 'Empty spaces not allowed. Please check type and try again.'
// 			}
// 			return response;
// 		}
// 		if (req.name.trim().length === 0) {
// 			const response = {
// 				error: 'Empty spaces not allowed. Please check name and try again.'
// 			}
// 			return response;
// 		}
// 	} catch (error) {
// 		const response = {
// 			status: 500,
// 			error: error
// 		};
// 		return response;
// 	}
// }