class RandomStringGenerator

	WHITELIST = ('a'..'z').to_a + (0..9).to_a
	WHITELIST_LENGTH = WHITELIST.length

	@@rand = Random.new

	def self.generate_string(length = 32)
		new_string = ""
		length.times do
			index = @@rand.rand WHITELIST_LENGTH
			new_string << WHITELIST[index].to_s
		end
		new_string
	end

end